import { CorsOptions } from "cors";

// cors and session
export const options: CorsOptions = {
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