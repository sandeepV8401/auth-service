const express = require("express")
const env = require("../../config.js/env")
const router = express.Router()

router.get("/test", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Test route is working fine",
        timestamp: new Date(),
    })
})

router.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Health check ok",
        env: env.NODE_ENV,
        upTime: process.uptime(),
        timestamp: new Date(),
    })
})
module.exports = router
