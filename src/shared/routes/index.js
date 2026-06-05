const express = require("express")
const router = express.Router()

const authRoutes = require("../../modules/auth/auth.routes")
const testRoutes = require("./testRoutes")

router.use("/", testRoutes)
router.use("/auth", authRoutes)

module.exports = router