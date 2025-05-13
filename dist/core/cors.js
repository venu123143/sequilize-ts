"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = void 0;
exports.options = {
    origin: [
        "http://localhost:8000",
        "http://localhost:4200",
        "http://localhost:3000",
        "http://143.244.132.143:9632",
        "https://ecoupons.nerchuko.in"
    ],
    credentials: true,
    exposedHeaders: ["sessionid", "logintoken", "resettoken", "refreshtoken"],
    allowedHeaders: ["sessionid", "logintoken", "resettoken", "refreshtoken", "Content-Type", "Authorization", "token", "locale", "x-device-token", 'fcmtoken'],
};
