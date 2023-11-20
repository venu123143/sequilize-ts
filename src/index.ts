import express, { Application, } from "express";
import passport from "passport"
import { Server } from "http"
import cors, { CorsOptions } from "cors"
import cookieParser from "cookie-parser"
import morgan from "morgan"



// swagger
import swaggerjsdoc from "swagger-jsdoc"
import swaggerui from "swagger-ui-express"

// Handle uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server for handling uncaught Exception`);
})

import 'dotenv/config'
import './utils/GoogleAuth';
import './utils/FacebookAuth';
import './utils/GithubAuth';


const app: Application = express()

import session from "./config/ConnectSession"
import ErrorHandler from "./middleware/Error"
import userRoute from "./routes/UserRoutes"
import productRoute from "./routes/ProductRoute"
import { swagOptions } from "./utils/Options"


// cors and session
const options: CorsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true,
}
app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev'));

// console.log(RedisStore);

// controllers
app.get('/', (req, res) => {

    const value = req.session.value ? req.session.value += 1 : req.session.value = 1
    res.send(`backend home route sucessfull with id: ${req.session.id}, value= ${value}`)
})

app.use('/api/users', userRoute)
app.use('/api/product', productRoute)

const swags = swaggerjsdoc(swagOptions)
app.use("/api", swaggerui.serve, swaggerui.setup(swags))

app.use(ErrorHandler)
const port = process.env.PORT || 5000
const server: Server = app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})

// unhandled promise rejection
process.on("unhandledRejection", (err: Error) => {
    console.log(`Shutting down the server for ${err.message}`);
    console.log(`Shutting down the server for unhandle promise rejection`);
    server.close(() => {
        process.exit(1)
    })
})
