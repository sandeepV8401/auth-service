const asyncHandler = require("../../shared/middlewares/asyncHandler")
const { successResponse } = require("../../shared/utils/responses")
const { registerService, loginService } = require("./auth.service")

const registerHandler = asyncHandler(async (req, res) => {
    const user = await registerService(req.body)

    return successResponse(res, {
        statusCode: 201,
        message: "User registered successfully",
        data: user
    })
})

const loginHandler = asyncHandler(async (req, res) => {
    const { user, accessToken, refreshToken } = await loginService(req.body)


    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return successResponse(res, {
        statusCode: 200,
        message: "Login successful",
        data: { user, accessToken }
    })
})

module.exports = { registerHandler, loginHandler }