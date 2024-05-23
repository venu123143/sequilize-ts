import { Request, Response, NextFunction } from "express"
import { UserModel } from "../models/UserModel"
import db from "../config/db"
import jwt, { JwtPayload } from "jsonwebtoken"
import FancyError from "../utils/FancyError";

declare module 'express-serve-static-core' {
    interface Request {
        user?: UserModel;
    }
}


export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    // let token;
    // if (req?.headers?.authorization?.startsWith("Bearer")) {
    //     token = req.headers.authorization.split(" ")[1]
    //     try {
    //         if (token) {
    //             const decode = jwt.verify(token, process.env.REFRESH_SECRET_KEY as jwt.Secret) as JwtPayload
    //             const user = await db.user.findByPk(decode?.id)

    //             if (user !== null) {
    //                 req.user = user;
    //             }
    //             next();
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         res.json({ message: "not Authorized token expired, please login again" })
    //         // throw new FancyError('not Authorized token expired, please login again', 401)
    //     }
    // } else {
    //     res.json({ message: "No token attached to the header" })
    //     // throw new FancyError('No token attached to the header', 404)

    // }
    const loginToken = req.session.LoginToken
    if (loginToken) {
        next();
    } else {
        throw new FancyError("Unauthorized", 401)
    }

}
