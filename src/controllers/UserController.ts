import { Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt, { JwtPayload } from "jsonwebtoken"
import os from "os"

import db from "../config/db"
import UAParser from "ua-parser-js"
import { redisClient } from "../config/ConnectSession"

declare module 'express-session' {
    interface SessionData {
        LoginToken?: string;
        value: number;
    }
}

export const RegisterUser = async (req: Request, res: Response) => {
    try {
        const user = await db.user.create(req.body)
        res.json({ message: "User registered sucessfully", user })
    } catch (error: any) {
        res.json({ error: error?.errors[0]?.message })
    }
}


export const LoginUser = async (req: Request, res: Response) => {
    try {
        const email = req.body?.email
        const password = req.body?.password

        const user = await db.user.findOne({ where: { email, provider: "emailRegistration" } })
        if (!user) {
            res.status(401).json({ message: 'Email id or password is incorrect' })
            return
        }
        const isAuth = await bcrypt.compare(password, user.password as string)

        if (!isAuth) {
            res.status(401).json({ message: 'Email id or password is incorrect password' })
            return
        }
        const devices = await db.device.findAll({ where: { user_id: user.id } })

        if (devices.length >= 3) {
            res.json({ message: 'Your account has reached the maximum login limit for this subscription.' })
            return
        }

        const deviceInfo = req.headers['user-agent'];
        let parser = new UAParser(deviceInfo);
        const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_SECRET_KEY as jwt.Secret, { expiresIn: '1d' });

        req.session.LoginToken = refreshToken

        const logInfo = await db.device.create({
            name: parser.getOS().name as string,
            type: os.hostname(), user_id: user.id as number,
            browser: parser.getBrowser().name as string,
            authToken: refreshToken
        })

        res.status(201).json({
            sucess: true,
            message: "user logged in sucessfully",
            user,
            logInfo
        })
    } catch (error: any) {
        res.json(error)
    }
}


export const logOutUser = async (req: Request, res: Response) => {
    const loginToken = req.session.LoginToken;

    if (!loginToken) {
        return res.status(401).json({ message: 'User is not authenticated' });
    }
    const decodedToken = jwt.verify(loginToken, process.env.REFRESH_SECRET_KEY as jwt.Secret) as { id: number };

    await db.device.destroy({ where: { user_id: decodedToken.id, authToken: loginToken } });
    delete req.session.LoginToken;

    res.clearCookie('sessionId', { path: '/' })
        .status(200).json({ success: true, message: 'User logged out successfully' });
}

export const sendotp = async (req: Request, res: Response) => {
    const mobile = req.body?.mobile
    try {
        let otp = Math.floor(100000 + Math.random() * 900000).toString()
        const [user, created] = await db.user.findOrCreate({
            where: { mobile },
            defaults: { mobile, otp },
        });

        // const msg = sendTextMessage(mobile, otp)
        res.status(200).json({
            user,
            success: true,
            message: `Verification code sent to ${mobile} `,
        });
    } catch (error) {

        res.status(500).json({ success: false, message: `Incorrect Number or Invalid Number.`, error });
    }
}

export const verifyOtp = async (req: Request, res: Response) => {
    const mobile = req.body?.mobile;
    let otp = req.body?.otp;
    otp = otp.toString().replaceAll(",", "");

    try {
        const user = await db.user.findOne({ where: { mobile } });
        const time = user?.updatedAt?.getTime();
        const currentTime = new Date().getTime();
        const otpValidityDuration = 10 * 60 * 1000;
        const isValid = time ? currentTime - time : 13;
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user && user.otp == otp && time && isValid <= otpValidityDuration) {
            const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_SECRET_KEY as jwt.Secret, { expiresIn: '1d' });
            const options = {
                maxAge: 1 * 24 * 60 * 60 * 1000,
                secure: false,
                httpOnly: true,
            }
            res.status(201).cookie('LoginToken', refreshToken, options).json({
                sucess: true,
                message: "user logged in sucessfully",
                refreshToken,
                user
            })
        } else {
            res.status(401).json({ success: false, message: "Invalid OTP or Time out..! please try again :-)" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const user = await db.user.findOne({ where: { email: email } })
        if (!user) {
            res.status(404).json({ sucess: false, message: "Email not found" })
            return
        }
        // creating token
        const token = jwt.sign({ id: user.id }, process.env.FORGOT_PASSWORD as string, { expiresIn: '10m' })
        // sendig email part
        const resetUrl = `${process.env.CLIENT_URL}/resetpassword/${token}`

        await user.update({ resetLink: token })
        res.json({ resetUrl, message: "reset link sent to your mail Id." })

        // saving token 
    } catch (error: any) {
        res.status(500).json({ error, sucess: false, message: "Internal server error" })

    }

}

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { resetLink, password } = req.body;
        const user = jwt.verify(resetLink, process.env.FORGOT_PASSWORD as string) as JwtPayload

        const foundUser = await db.user.findByPk(user?.id);
        if (foundUser) {
            foundUser.password = password;
            foundUser.resetLink = '';
            await foundUser.save();
            res.status(200).json({ success: true, message: 'Password reset successful' });
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (error: any) {
        res.status(500).json({ sucess: false, message: "Token is expired or invalid token " })
    }
}

export const sucessPage = async (req: Request, res: Response) => {
    try {
        if (req.user) {
            const devices = await db.device.findAll({ where: { user_id: req.user.id } })

            if (devices.length >= 3) {
                res.json({ message: 'Your account has reached the maximum login limit for this subscription.' })
                return
            }

            const deviceInfo = req.headers['user-agent'];
            let parser = new UAParser(deviceInfo);
            const refreshToken = jwt.sign({ id: req.user.id }, process.env.REFRESH_SECRET_KEY as jwt.Secret, { expiresIn: '1d' });

            req.session.LoginToken = refreshToken

            const logInfo = await db.device.create({
                name: parser.getOS().name as string,
                type: os.hostname(), user_id: req.user.id as number,
                browser: parser.getBrowser().name as string,
                authToken: refreshToken
            })
            res.status(201).redirect(process.env.CLIENT_ORIGIN as string)
        }
    } catch (error: any) {
        console.log(error);

    }
}
export const failurePage = async (req: Request, res: Response) => {
    res.status(401).redirect(process.env.FAILURE_REDIRECT as string)

}

export const getAllUsers = async (req: Request, res: Response) => {
    const cacheUsers = await redisClient.get("users");
    if (cacheUsers) {
        const users = JSON.parse(cacheUsers);
        res.json({ cached: true, users })
        return
    }


    
    const users = await db.user.findAll()
    await redisClient.set("users", JSON.stringify(users), { EX: 3600 });
    res.json(users)
}

export const getDevices = async (req: Request, res: Response) => {
    try {
        const dev = await db.device.findAll({ where: { user_id: 1 } })
        res.json(dev)
    } catch (error) {

    }
}
export const value = async (req: Request, res: Response) => {
    res.json({ session: req.session.LoginToken })
}
