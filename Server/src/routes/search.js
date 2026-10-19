import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { prisma } from "../database/db-connection.js";

import { Router } from "express"

const router = Router()

router.route("/").get(asyncHandler(async (req, res) => {
    const q = String(req.query.q || "").trim()
    const limit = Math.min(Number(req.query.limit) || 5, 11)

    if (q.length < 2) {
        return res
            .status(200)
            .json(new ApiResponse(
                200, {
                tests: [],
                packages: []
            },
                "Search results")
            )
    }

    const where = {
        name: {
            contains: q,
            mode: 'insensitive'
        }
    }
    const orderBy = [{ isPopular: 'desc' }, { name: 'asc' }]

    const [tests, packages] = await Promise.all([
        prisma.test.findMany({
            where,
            orderBy,
            take: limit,
            select: {
                id: true,
                name: true,
                price: true,
                offerPrice: true,
                category: true
            }
        }),

        prisma.package.findMany({
            where,
            orderBy,
            take: limit,
            select: {
                id: true,
                name: true,
                price: true,
                offerPrice: true,
                _count: {
                    select: {
                        items: true
                    }
                }
            }
        })
    ])

    return res
        .status(200)
        .json(new ApiResponse
            (200,
                { tests, packages },
                "Search results")
        )
}))

export default router
