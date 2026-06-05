const app = require("./src/app")
const env = require("./src/config.js/env")

const startServer = () => {
    if (!env.PORT) {
        console.log("PORT is missing")
        process.exit(1)
    }

    const server = app.listen(env.PORT, () => {
        console.log(`Server is running at: ${env.PORT}`)
    })

    server.on("error", (err) => {
        console.error("Server failed to start:", err.message);
        process.exit(1);
    });

    process.on("SIGINT", () => {
        console.log("SIGINT received, shutting down...");
        server.close(() => {
            console.log("Server closed gracefully");
            process.exit(0);
        });
    });

}
startServer()