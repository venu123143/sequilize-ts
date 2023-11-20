import { UserModel } from "../models/UserModel.js"
import { Response, CookieOptions } from "express";

const jwtToken = async (user: UserModel, statusCode: number, res: Response) => {
    const token = await user.generateAuthToken();
    // let cur_token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY as jwt.Secret, { expiresIn: "1d" });
    if (token !== undefined) {
        // expiresIn:"3d",
        // maxAge = 24 * 60 * 60 * 1000 = 1 day
        const options: CookieOptions = {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            secure: true,
            httpOnly: true,
            sameSite: "none",
        }
        res.status(statusCode).cookie('loginToken', token, options).json({
            user,
            sucess: true,
            message: "user logged in sucessfully"
        })
    } else {
        console.log('token is undefined');
    }
}




export default jwtToken