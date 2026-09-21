import { Router } from "express";

import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'

const router = Router()

router.route('/login').post(asyncHandler(async (req, res) => {

    const {email,password,rememberMe} = req.body

    if(!email || !password){
        throw new ApiError(400, "Email or Password is required")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "User logged in"
        )
    )
}));

export default router;