const AppError = require("../../shared/errors/AppError")
const User = require("./auth.model")
const { hashPassword } = require("./auth.utils")

const registerService = async (userData) => {
    console.log("userData", userData)
    const { name, email, password } = userData

    const existingUser = await User.findOne({ email })
    console.log("Existing User", existingUser)
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

module.exports = { registerService }