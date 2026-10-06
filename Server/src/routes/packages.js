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
    console.log('add')
}))

export default router;