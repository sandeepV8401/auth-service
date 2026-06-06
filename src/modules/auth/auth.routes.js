const express = require("express")
const validate = require("../../shared/middlewares/validate.middleware")
const { registerSchema, loginSchema } = require("./auth.validate")
const { registerHandler, loginHandler } = require("./auth.controller")
const router = express.Router()

router.post("/register", validate(registerSchema), registerHandler)
router.post("/login", validate(loginSchema), loginHandler)

module.exports = router