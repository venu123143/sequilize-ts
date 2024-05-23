import { Strategy as GoogleStrategy, StrategyOptions } from 'passport-google-oauth2';
import db from "../config/db"
import { promisify } from 'util';
import passport from "passport"
import { UserModel } from '../models/UserModel';

const verifyCallback = async (accessToken: string, refreshToken: string, profile: any, done: any) => {
    try {
        let user = await db.user.findOne({ where: { email: profile.emails![0].value } });

        if (!user) {
            // user = await db.user.create({
            //     firstname: profile.displayName,
            //     email: profile.emails![0].value,
            //     profile: profile?.picture,
            //     provider: 'google'
            // });
        }
        return done(null, user);
    } catch (error) {
        console.log(error);
        return done(error);
    }
};

const googleStrategyOptions: StrategyOptions = {
    clientID: process.env.CLIENT_ID || '',
    clientSecret: process.env.CLIENT_SECRET || '',
    callbackURL: process.env.GOOGLE_OAUTH_REDIRECT_URL || '',
};

passport.use(new GoogleStrategy(googleStrategyOptions, promisify(verifyCallback)));

passport.serializeUser((user, done) => {
    done(null, user as UserModel);
});

passport.deserializeUser<UserModel | false | null | undefined>((user, done) => {
    done(null, user as UserModel);
});