
// session and redis
import session from 'express-session';
import { createClient } from "redis";
import RedisStore from "connect-redis";

// import MongoStore from "connect-mongo"
// const store = MongoStore.create({ mongoUrl: process.env.MONGO_URL })

export const redisClient = createClient()
redisClient.connect().then(() => console.log("redis connected")).catch((err) => console.log(err))


const ses = session({
    name: 'sessionId',
    store: new RedisStore({ client: redisClient }),
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET as string,
    cookie: {
        sameSite: 'lax',
        secure: false,
        httpOnly: true,
        maxAge: 10 * 60 * 100 // 10 min
    }
}) 
export default ses