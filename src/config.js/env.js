require("dotenv").config()

const env = {
    PORT: process.env.PORT || 5050,
    MONGO_URI: process.env.MONGO_URI
}

module.exports = env

