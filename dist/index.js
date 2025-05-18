"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("module-alias/register");
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require("dotenv/config");
require("@/config/db");
const cors_2 = require("@/core/cors");
const Response_1 = __importDefault(require("@/utils/Response"));
const routes_1 = __importDefault(require("@/global/routes"));
process.on("uncaughtException", (err) => {
    console.error(`Shutting down the server for handling uncaught exceptions`);
});
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = parseInt(process.env.PORT, 10) || 7893;
        this.server = http_1.default.createServer(this.app);
        this.config();
        this.routes();
    }
    config() {
        this.app.disable('x-powered-by');
        this.app.use((0, cors_1.default)(cors_2.options));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cookie_parser_1.default)());
        this.app.use('/images', express_1.default.static(path_1.default.join(__dirname, '../src/public/images')));
        this.app.use('/static-files', express_1.default.static(path_1.default.join(__dirname, '../src/public/static')));
        this.app.use((0, helmet_1.default)());
    }
    routes() {
        this.app.get("/", (req, res) => {
            Response_1.default.SuccessResponse(res, 200, { message: "Development Server started successfully.", data: [] });
        });
        this.app.use("/api/v1", routes_1.default);
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.server.listen(this.port, () => {
                console.log(`Server is running on port ${this.port}`);
            });
            this.handleUncaughtRejection();
            this.handleGracefulShutdown();
        });
    }
    handleUncaughtRejection() {
        process.on("unhandledRejection", (err) => {
            this.server.close(() => {
                process.exit(1);
            });
        });
    }
    handleGracefulShutdown() {
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
const serverInstance = new Server();
serverInstance.start();
