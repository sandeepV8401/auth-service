const express = require("express")
const validate = require("../../shared/middlewares/validate.middleware")
const { registerSchema } = require("./auth.validate")
const registerHandler = require("./auth.controller")
const router = express.Router()

router.post("/register", validate(registerSchema), registerHandler)

module.exports = router