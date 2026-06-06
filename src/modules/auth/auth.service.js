const jwt = require("jsonwebtoken")
const AppError = require("../../shared/middlewares/AppError")
const User = require("./auth.model")
const { hashPassword, comparePasswords, generateTokens } = require("./auth.utils")
const env = require("../../config.js/env")

const registerService = async (userData) => {

    const { name, email, password } = userData

    const existingUser = await User.findOne({ email })
    if (existingUser) {
        throw new AppError(400, "Email already exists", [{ field: "email", message: "Email already exists" }]);
    }
    const hashedPassword = await hashPassword(password)

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: "user"
    })
    const safeUser = user.toObject()
    delete safeUser.password
    delete safeUser.refreshToken
    delete safeUser.__v
    delete safeUser.updatedAt

    return { user: safeUser }
}

const loginService = async (userData) => {
    const { email, password } = userData

    const user = await User.findOne({ email }).select('+password')
    if (!user) {
        console.log("User does not exist")
        throw new AppError(404, "User does not exists")
    }

    const storedPassword = user.password
    const isMatch = await comparePasswords(password, storedPassword)

    const { accessToken, refreshToken } = generateTokens({ userId: user._id, role: user.role })

    const safeUser = user.toObject()
    delete safeUser.password
    delete safeUser.refreshToken
    delete safeUser.__v
    delete safeUser.updatedAt

    return { user: safeUser, accessToken, refreshToken }
}

module.exports = { registerService, loginService }