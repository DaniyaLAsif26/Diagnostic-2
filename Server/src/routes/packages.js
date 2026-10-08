import { Router } from "express";

import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { prisma } from "../database/db-connection.js";

const router = Router()

router.route('/all').get(asyncHandler(async (req, res) => {
    // console.log('hello')
}))

router.route('/add').post(asyncHandler(async (req, res) => {
    const { name, price, category, preparation, relevance, offerPrice, isPopular, tests } = req.body

    if (!name?.trim()) {
        throw new ApiError(400, "Package name is required")
    }

    if (price === undefined || price === null) {
        throw new ApiError(400, "Price is required")
    }

    if (offerPrice < 0) {
        throw new ApiError(400, "Offer Price can't be negative")
    }

    if (!category) {
        throw new ApiError(400, "Category  is required")
    }

    if (!Array.isArray(relevance) || relevance.length === 0) {
        throw new ApiError(400, "At least one relevance is required")
    }

    if (!Array.isArray(tests) || tests.length < 2) {
        throw new ApiError(400, "Tests are required")
    }

    const keys = tests.map(t => t.testId ?? t.name?.trim().toLowerCase())
    if (new Set(keys).size !== keys.length) {
        throw new ApiError(400, "Duplicate tests in package")
    }

    const exists = await prisma.package.findUnique({
        where: { name: name.trim() }
    })
    if (exists) throw new ApiError(409, "Package with this name already exists")

    const testIds = [...new Set(tests.filter(t => t.testId != null).map(t => t.testId))]

    if (testIds.length) {
        const found = await prisma.test.findMany({
            where: { id: { in: testIds } }
        })

        if (found.length !== testIds.length) {
            throw new ApiError(404, "One or more tests not found")
        }
    }

    if (tests.some(t => t.testId == null && !t.name?.trim())) {
    throw new ApiError(400, "Custom tests must have a name")
}

    const savedPackage = await prisma.package.create({
        data: {
            name: name.trim(),
            price,
            category,
            preparation,
            relevance,
            offerPrice,
            isPopular,
            items: {
                create: tests.map(t => t.testId != null ? { testId: t.testId } : { testName: t.name?.trim() })
            }
        },
        include: { items: true }
    })

    return res
        .status(201)
        .json(new ApiResponse(
            201,
            savedPackage,
            "Package created"
        ))
}))

export default router;