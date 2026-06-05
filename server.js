const mongoose = require("mongoose");
const app = require("./src/app")
const connectDB = require("./src/config.js/db")
const env = require("./src/config.js/env")

const startServer = async () => {
    if (!env.PORT) {
        console.log("PORT is missing")
        process.exit(1)
    }
    try {
        await connectDB();
        const server = app.listen(env.PORT, () => {
            console.log(`Server is running at: ${env.PORT}`)
        })

        server.on("error", (err) => {
            console.error("Server failed to start:", err.message);
            process.exit(1);
        });

        process.on("SIGINT", () => {
            console.log("SIGINT received, shutting down...");
            server.close(async () => {
                await mongoose.connection.close();
                console.log("DB closed");
                process.exit(0);
            });
        });
    } catch (err) {
        console.error("Startup error: ", err.message)
    }
}
startServer()