const express = require("express")
const notFound = require("./shared/errors/notFound")
const errorHandler = require("./shared/errors/errorHandler")
const routes = require("./shared/routes/index")
const app = express()

app.use(express.json());

app.use("/api/v1", routes)
app.use(notFound)
app.use(errorHandler)

module.exports = app