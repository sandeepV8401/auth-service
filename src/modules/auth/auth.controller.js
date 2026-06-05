const asyncHandler = require("../../shared/middlewares/asyncHandler")
const { successResponse } = require("../../shared/utils/responses")
const { registerService } = require("./auth.service")

const registerHandler = asyncHandler(async (req, res) => {
    const user = await registerService(req.body)

    return successResponse(res, {
        statusCode: 201,
        message: "User registered successfully",
        data: user
    })
})

module.exports = registerHandler