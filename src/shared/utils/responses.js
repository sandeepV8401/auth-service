const env = require("../../config.js/env")

const errorResponse = (res, obj) => {
    const {
        statusCode = 500,
        message = "Internal Server Error",
        errors = null,
        stack
    } = obj

    return res.status(statusCode).json({
        success: false,
        message,
        ...(errors && { errors }),
        stack,
        timestamp: new Date()
    })
}

const successResponse = (res, obj) => {
    const {
        statusCode = 200,
        message = "Success",
        data = [],
        meta
    } = obj

    return res.status(statusCode).json({
        success: true,
        message,
        data,
        ...(meta && { meta }),
        timestamp: new Date()
    })
}

module.exports = { errorResponse, successResponse }