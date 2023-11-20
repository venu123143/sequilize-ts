import { NextFunction, Request, Response } from 'express';
import Joi from 'joi'

export const loginSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().required(),
})


// Define the schema for user registration data
const registrationSchema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9@#$%^&_!]{8,30}$')).required(),
    mobile: Joi.string().pattern(new RegExp('^[0-9]{10}$')).required(),
});


export const validateRegistration = (req: Request, res: Response, next: NextFunction) => {
    const { error } = registrationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};
export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}
