import { Strategy as GitHubStrategy, StrategyOptions } from 'passport-github';
import db from "../config/db"
import { promisify } from 'util';
import passport from "passport"
import { UserModel } from '../models/UserModel';

const verifyCallback = async (accessToken: string, refreshToken: string, profile: any, done: any) => {

    try {
        let user = await db.user.findOne({ where: { email: profile?.profileUrl } });

        if (!user) {
            user = await db.user.create({
                firstname: profile.displayName,
                email: profile?.profileUrl,
                profile: profile?.avatar_url,
                provider: 'github'
            });
        }
        return done(null, user);
    } catch (error) {
        console.log(error);
        return done(error);
    }
};

const googleStrategyOptions: StrategyOptions = {
    clientID: process.env.GIT_CLIENT_ID || '',
    clientSecret: process.env.GIT_CLIENT_SECRET || '',
    callbackURL: process.env.GIT_REDIRECT_URL || '',
};

passport.use(new GitHubStrategy(googleStrategyOptions, promisify(verifyCallback)));

passport.serializeUser((user, done) => {
    done(null, user as UserModel);
});

passport.deserializeUser<UserModel | false | null | undefined>((user, done) => {
    done(null, user as UserModel);
});