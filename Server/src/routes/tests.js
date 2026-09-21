import { Router } from "express";

import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { prisma } from "../database/db-connection.js";

const router = Router()

router.route('/add').post(asyncHandler(async (req, res) => {

    const { name, price, category, preparation, relevance } = req.body

    if (!name.trim()) {
        throw new ApiError(400, "Test name is required")
    }

    if (price === undefined || price === null) {
        throw new ApiError(400, "Price is required")
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
            relevance
        }
    })

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {test},
            "Test saved successfully"
        )
    )

}))

export default router;