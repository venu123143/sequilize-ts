import { Request, Response, NextFunction } from "express";
import passport from "passport";
import passportLocal from "passport-local";
import { Strategy as FacebookStrategy, StrategyOptions } from 'passport-facebook';
import { find } from "lodash";
import { promisify } from 'util';

import { UserModel } from '../models/UserModel';
import db from "../config/db";

// import { User, UserType } from '../models/User';

const fbStrategyOptions: StrategyOptions = {
    clientID: process.env.FB_CLIENT_ID || '',
    clientSecret: process.env.FB_CLIENT_SECRET || '',
    callbackURL: process.env.FB_REDIRECT_URL || '',
};

const verifyCallback = async (accessToken: string, refreshToken: string, profile: any, done: any) => {
    try {
        console.log(accessToken, refreshToken, profile);
        try {
            let user = await db.user.findOne({ where: { email: profile._json.email } });

            if (!user) {
                user = await db.user.create({
                    firstname: `${profile.name.givenName} ${profile.name.familyName}`,
                    email: profile._json.email,
                    provider: 'facebook',
                    profile: `https://graph.facebook.com/${profile.id}/picture?type=large`,
                });
                await user.save();
            }

            return done(null, user);
        } catch (err) {
            return done(err);
        }

    } catch (error) {
        console.log(error);

        return done(error);
    }
};

passport.use(new FacebookStrategy(fbStrategyOptions, promisify(verifyCallback)));

passport.serializeUser((user, done) => {
    console.log("serialize", user);

    done(null, user as UserModel);
});

passport.deserializeUser<UserModel | false | null | undefined>((user, done) => {
    console.log("de-serialize", user);

    done(null, user as UserModel);
});