"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
const express_session_1 = __importDefault(require("express-session"));
const redis_1 = require("redis");
const connect_redis_1 = __importDefault(require("connect-redis"));
exports.redisClient = (0, redis_1.createClient)();
exports.redisClient.connect().then(() => console.log("redis connected")).catch((err) => console.log(err));
const ses = (0, express_session_1.default)({
    name: 'sessionId',
    store: new connect_redis_1.default({ client: exports.redisClient }),
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
        sameSite: 'lax',
        secure: false,
        httpOnly: true,
        maxAge: 10 * 60 * 100
    }
});
exports.default = ses;
