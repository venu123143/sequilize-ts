"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_facebook_1 = require("passport-facebook");
const util_1 = require("util");
const db_1 = __importDefault(require("../config/db"));
const fbStrategyOptions = {
    clientID: process.env.FB_CLIENT_ID || '',
    clientSecret: process.env.FB_CLIENT_SECRET || '',
    callbackURL: process.env.FB_REDIRECT_URL || '',
};
const verifyCallback = (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(accessToken, refreshToken, profile);
        try {
            let user = yield db_1.default.user.findOne({ where: { email: profile._json.email } });
            if (!user) {
                user = yield db_1.default.user.create({
                    firstname: `${profile.name.givenName} ${profile.name.familyName}`,
                    email: profile._json.email,
                    provider: 'facebook',
                    profile: `https://graph.facebook.com/${profile.id}/picture?type=large`,
                });
                yield user.save();
            }
            return done(null, user);
        }
        catch (err) {
            return done(err);
        }
    }
    catch (error) {
        console.log(error);
        return done(error);
    }
});
passport_1.default.use(new passport_facebook_1.Strategy(fbStrategyOptions, (0, util_1.promisify)(verifyCallback)));
passport_1.default.serializeUser((user, done) => {
    console.log("serialize", user);
    done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    console.log("de-serialize", user);
    done(null, user);
});
