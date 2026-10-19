import { Router } from "express";

import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { prisma } from "../database/db-connection.js";

const router = Router()

router.route('/add').post(asyncHandler(async (req, res) => {

    const { name, price, category, preparation, description, relevance, offerPrice, isPopular } = req.body

    if (!name.trim()) {
        throw new ApiError(400, "Test name is required")
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
        throw new ApiError(400, "Category  is required")
    }

    const test = await prisma.test.create({
        data: {
            name,
            price,
            category,
            preparation,
            description,
            relevance,
            offerPrice,
            isPopular
        }
    })

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { test },
                "Test saved successfully"
            )
        )

}))

router.route('/all').get(asyncHandler(async (req, res) => {
    const allTests = await prisma.test.findMany()

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { allTests },
                "All Tests"
            )
        )
}))

router.route('/search').get(asyncHandler(async (req, res) => {
    const search = String(req.query.q || '').trim()

    if (search.length < 2) {
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { tests: [] },
                    "Search Results"
                )
            )
    }

    const tests = await prisma.test.findMany({
        where: {
            name:
            {
                contains: search, mode: 'insensitive'
            }
        },
        select: {
            id: true, name: true, price: true
        },
        orderBy: { name: 'asc' },
        take: 8
    })

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { tests },
                "Search Results"
            )
        )
}))

router.route('/popular').get(asyncHandler(async (req, res) => {

    const limit = Math.min(Number(req.query.limit) || 3, 20)

    const popularTests = await prisma.test.findMany({
        where: { isPopular: true },
        orderBy: { name: 'asc' },
        take: limit
    })

    return res.status(200)
        .json(new ApiResponse(
            200,
            { popularTests },
            "Popular Tests"
        ))
}))

router.route('/:id').get(asyncHandler(async (req, res) => {

    const id = Number(req.params.id)

    if (!id) {
        throw new ApiError(
            404,
            'Test id is required'
        )
    }

    const test = await prisma.test.findUnique({
        where: { id: id },
        include: {
            packageItems: {
                select: {
                    // Full package with its tests, so the site can show the usual package card
                    pkg: {
                        include: {
                            items: {
                                select: {
                                    testId: true,
                                    testName: true,
                                    test: { select: { name: true, category: true } }
                                }
                            }
                        }
                    }
                },
                orderBy: { pkg: { name: 'asc' } }
            }
        }

    })

    if (!test) {
        throw new ApiError(
            404,
            'No test found'
        )
    }

    return res.status(200)
        .json(
            new ApiResponse(
                200,
                { test },
                "Test data found"
            )
        )
}))

router.route('/edit/:id').patch(asyncHandler(async (req, res) => {
    const id = Number(req.params.id)

    if (!id) {
        throw new ApiError(
            404,
            'Test Id id required'
        )
    }

    const editedTest = await prisma.test.update({
        where: {
            id: id
        },
        data: req.body
    })

    if (!editedTest) {
        throw new ApiError(
            404,
            'Test not found'
        )
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { editedTest },
                "Test updated successfully"
            )
        )
}))

router.route("/delete/:id").delete(asyncHandler(async (req, res) => {
    const id = Number(req.params.id)

    if (!id) {
        throw new ApiError(
            404,
            "Test id is required"
        )
    }

    const test = await prisma.test.delete({
        where: { id }
    })

    if (!test) {
        throw new ApiError(
            404,
            "Test not found"
        )
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Test deleted successfully"
            )
        )
}))



export default router;