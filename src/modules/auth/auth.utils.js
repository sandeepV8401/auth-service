const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const AppError = require("../../shared/middlewares/AppError");
const env = require("../../config.js/env");

const SALT_ROUNDS = 10;
const hashPassword = async (inputPassword) => {
    if (!inputPassword) {
        console.log("Password is missing")
        throw new AppError(400, "Password required")
    }
    const hashedPassword = await bcrypt.hash(inputPassword, SALT_ROUNDS)
    return hashedPassword
}

const comparePasswords = async (inputPassword, storedPassword) => {

    if (!inputPassword || !storedPassword) {
        throw new AppError(400, "Password required")
    }
    const isMatch = await bcrypt.compare(inputPassword, storedPassword)
    return isMatch
}

const generateTokens = (payload) => {

    const accessToken = jwt.sign(payload, env.ACCESS_TOKEN_SECRET, { expiresIn: env.ACCESS_TOKEN_EXPIRY })

    const refreshToken = jwt.sign(payload, env.REFRESH_TOKEN_SECRET, { expiresIn: env.REFRESH_TOKEN_EXPIRY })

    return { accessToken, refreshToken }

}

module.exports = { hashPassword, comparePasswords, generateTokens }