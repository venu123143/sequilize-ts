import express, { Application } from "express";
import 'module-alias/register';
import http from "http";
import cors from "cors";
import path from "path";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import "dotenv/config";

import "@/config/db";
import { options } from "@/core/cors";
import RESPONSE from "@/utils/Response";
import v1Router from "@/global/routes";

process.on("uncaughtException", (err) => {
    // LoggerService.loggerInstance.logAuditEvent("Uncaught exception", { userId: "system", action: "uncaughtException", details: err.message });
    console.error(`Shutting down the server for handling uncaught exceptions`);
});


class Server {
    private app: Application;
    private port: number;
    private server: http.Server;

    constructor() {
        this.app = express();
        this.port = parseInt(process.env.PORT as string, 10) || 7893;
        this.server = http.createServer(this.app); // Initialize HTTP server

        this.config();
        this.routes();
    }

    private config() {
        this.app.disable('x-powered-by');
        this.app.use(cors(options));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.use('/images', express.static(path.join(__dirname, '../src/public/images')));
        this.app.use('/static-files', express.static(path.join(__dirname, '../src/public/static')));
        this.app.use(helmet());
    }

    private routes() {
        this.app.get("/", (req, res) => {
            RESPONSE.SuccessResponse(res, 200, { message: "Development Server started successfully.", data: [] });
        });

        this.app.use("/api/v1", v1Router);
    }

    public async start() {
        this.server.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });

        this.handleUncaughtRejection();
        this.handleGracefulShutdown();
    }



    private handleUncaughtRejection() {
        process.on("unhandledRejection", (err: Error) => {
            // LoggerService.loggerInstance.logAuditEvent("Unhandled rejection", { userId: "system", action: "unhandledRejection", details: err.message });
            this.server.close(() => {
                process.exit(1);
            });
        });
    }

    private handleGracefulShutdown() {
        process.on("SIGINT", () => {
            console.log("Received SIGINT. Shutting down gracefully.");
            this.server.close(() => process.exit(0));
        });

        process.on("SIGTERM", () => {
            console.log("Received SIGTERM. Shutting down gracefully.");
            this.server.close(() => process.exit(0));
        });
    }
}

// Start the server
const serverInstance = new Server();
serverInstance.start();
