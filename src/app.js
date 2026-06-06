const express = require("express")
const cookieParser = require("cookie-parser");

const notFound = require("./shared/errors/notFound")
const errorHandler = require("./shared/errors/errorHandler")
const routes = require("./shared/routes/index")

const app = express()

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", routes)
app.use(notFound)
app.use(errorHandler)

module.exports = app