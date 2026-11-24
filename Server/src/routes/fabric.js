import { Router } from "express";

import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { fabricQuery } from "../database/fabric.js";

const router = Router()

// Table the tests CSV was loaded into. Override with FABRIC_TESTS_TABLE in .env (e.g. "dbo.tests").
const TESTS_TABLE = process.env.FABRIC_TESTS_TABLE || 'dbo.tests'

// The name is spliced into the SQL (table names can't be parameters), so only allow [schema.]name
if (!/^[A-Za-z_][\w]*(\.[A-Za-z_][\w]*)?$/.test(TESTS_TABLE)) {
    throw new Error(`FABRIC_TESTS_TABLE "${TESTS_TABLE}" is not a valid table name`)
}

// Fabric errors (bad credentials, firewall, missing table...) are 500s that the app's error handler hides,
// so surface them as a 502 with the real reason - this route exists to debug the connection.
// Connection failures arrive wrapped in an AggregateError with an empty message - the real reasons are nested inside.
const fromFabric = (err) => {
    const nested = err.errors ?? err.originalError?.errors ?? []
    const reasons = [err.message, ...nested.map((e) => [e.code, e.message].filter(Boolean).join(': '))].filter(Boolean)
    return new ApiError(502, `Fabric error: ${reasons.join(' | ') || err.code || err.name}`)
}

// GET /api/fabric/health - connects and runs SELECT 1
router.route('/health').get(asyncHandler(async (req, res) => {
    try {
        await fabricQuery('SELECT 1 AS ok')
    } catch (err) {
        throw fromFabric(err)
    }

    return res.status(200).json(new ApiResponse(200, { connected: true }, "Fabric connected"))
}))

// GET /api/fabric/tests - every row of the tests table, in the same shape as /api/tests/all
router.route('/tests').get(asyncHandler(async (req, res) => {
    let rows
    try {
        rows = await fabricQuery(`SELECT * FROM ${TESTS_TABLE} ORDER BY id`)
    } catch (err) {
        throw fromFabric(err)
    }

    const allTests = rows.map((r) => ({
        id: Number(r.id),
        name: r.name,
        price: Number(r.price),
        offerPrice: Number(r.offer_price ?? 0),
        isPopular: Boolean(r.is_popular),
        category: r.category,
        relevance: r.relevance ? String(r.relevance).split('|') : [],
        preparation: r.preparation || null,
        description: r.description || null,
    }))

    return res
        .status(200)
        .json(new ApiResponse(200, { allTests }, `All Tests (from Fabric, ${allTests.length} rows)`))
}))

export default router
