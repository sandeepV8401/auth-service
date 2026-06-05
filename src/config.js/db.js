const mongoose = require("mongoose")
const env = require("./env")

const connectDB = async () => {
    if (!env.MONGO_URI) {
        console.log("MONGO_URI is not defined")
        process.exit(1)
    }
    try {
        const conn = await mongoose.connect(env.MONGO_URI)

        mongoose.connection.on("connected", () => {
            console.log("MongoDB connected");
        });

        mongoose.connection.on("disconnected", () => {
            console.warn("MongoDB disconnected");
        });

        mongoose.connection.on("error", (err) => {
            console.error("MongoDB error:", err.message);
        });

        console.log(`DB connected: ${conn.connection.host}`)
        return conn
    } catch (err) {
        console.error("DB connection failed: ", err.message)
        process.exit(1)
    }
}

module.exports = connectDB