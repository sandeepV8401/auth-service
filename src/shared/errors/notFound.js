const AppError = require("../middlewares/AppError")

const notFound = (req, res, next) => {
    return next(new AppError(404, `Requested Route not found: ${req.originalUrl}`))
}
module.exports = notFound