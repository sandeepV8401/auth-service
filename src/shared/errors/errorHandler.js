const env = require("../../config.js/env")
const { errorResponse } = require("../utils/responses")


const errorHandler = (err, req, res, next) => {

    let statusCode = err.statusCode || 500
    let message = err.message || "Internal Server Error"
    let errors = err.errors || null
    let stack = env.NODE_ENV === 'development' ? err.stack : undefined


    // 🔹 Mongo duplicate
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];

        message = "Duplicate field value";
        statusCode = 400;
        errors = [
            {
                field,
                message: `${field} already exists`
            }
        ];
    }

    // 🔹 Zod validation
    if (err.name === "ZodError") {
        message = "Validation failed";
        statusCode = 400;
        const zodErrors = err.issues || err.errors;
        errors = zodErrors.map(e => ({
            field: e.path.join("."),
            message: e.message
        }));
    }


    const errObj = {
        statusCode,
        message,
        errors,
        stack
    }

    return errorResponse(res, errObj)
}


module.exports = errorHandler