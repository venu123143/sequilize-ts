
/**
 * @swagger
 * components:
 *   schemas:
 *     UserAttributes:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         firstname:
 *           type: string
 *         lastname:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 *         mobile:
 *           type: string
 *         isBlocked:
 *           type: boolean
 *         forgotPassword:
 *           type: string
 *         otp:
 *           type: string
 *         authToken:
 *           type: string
 *         resetLink:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

import express from "express"
import passport from "passport"

import {
    LoginUser, RegisterUser, forgotPassword,
    getAllUsers, getDevices, logOutUser, resetPassword,
    sendotp, verifyOtp, sucessPage, failurePage, value
} from "../controllers/UserController"
import { authMiddleware } from "../middleware/AuthMiddleware"
import { validateLogin, validateRegistration } from "../middleware/Validate_schema"


const router = express.Router()
/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       description: User registration data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *               mobile:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Bad request (validation error, etc.)
 */
router.post('/register', validateRegistration, RegisterUser)
/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: User login
 *     tags:
 *       - Users
 *     requestBody:
 *       description: User login data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Unauthorized (incorrect credentials)
 */
router.post('/login', validateLogin, LoginUser)
/**
 * @swagger
 * /api/users/sendotp:
 *   post:
 *     summary: Send OTP to a user's mobile number
 *     tags:
 *       - Users
 *     requestBody:
 *       description: Mobile number for OTP generation
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mobile:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '../models/UserModel'
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request (e.g., invalid mobile number)
 *       500:
 *         description: Internal server error
 */
router.post('/sendotp', sendotp);

/**
 * @swagger
 * /api/users/verifyotp:
 *   post:
 *     summary: Verify OTP and log in the user
 *     tags:
 *       - Users
 *     requestBody:
 *       description: Mobile number and OTP for verification
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mobile:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       201:
 *         description: User successfully verified and logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *                 user:
 *                   $ref: '../models/UserModel'
 *       401:
 *         description: Invalid OTP or timeout
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.post('/verifyotp', verifyOtp);

/**
 * @swagger
 * /api/users/logout:
 *   get:
 *     summary: Log out a user
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: User successfully logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 success:
 *                   type: boolean
 *       400:
 *         description: Error during log out
 *       404:
 *         description: No token in cookies
 */
router.get('/logout', logOutUser);
/**
 * @swagger
 * /api/users/forgot-password:
 *   post:
 *     summary: Request a password reset link by email
 *     tags:
 *       - Users
 *     requestBody:
 *       description: User email for password reset
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset link sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resetUrl:
 *                   type: string
 *                 message:
 *                   type: string
 *       404:
 *         description: Email not found
 *       500:
 *         description: Internal server error
 */
router.post('/forgot-password', forgotPassword);
/**
 * @swagger
 * /api/users/reset-password:
 *   post:
 *     summary: Reset a user's password using a reset link
 *     tags:
 *       - Users
 *     requestBody:
 *       description: Reset link and new password for password reset
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               resetLink:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       404:
 *         description: User not found
 *       500:
 *         description: Token is expired or invalid token
 */
router.post('/reset-password', resetPassword);

/**
 * @swagger
 * /api/users/google:
 *   get:
 *     summary: Initiate Google OAuth authentication
 *     tags:
 *       - Users
 *     responses:
 *       302:
 *         description: Redirects to Google OAuth consent screen
 */
router.get('/google', passport.authenticate("google", { scope: ["profile", "email"] }))
/**
 * @swagger
 * /api/users/google/callback:
 *   get:
 *     summary: Google OAuth callback
 *     tags:
 *       - Users
 *     parameters:
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: Authorization code received from Google
 *       - in: query
 *         name: state
 *         schema:
 *           type: string
 *         required: true
 *         description: State parameter for security
 *     responses:
 *       302:
 *         description: Redirects to success or failure page based on authentication result
 */
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/api/users/failure', successRedirect: '/api/users/success' }))

router.get('/facebook', passport.authenticate("facebook", { scope: ["profile", "email"] }))
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/api/users/failure', successRedirect: '/api/users/success' }))

/**
 * @swagger
 * /api/users/github:
 *   get:
 *     summary: Initiate GitHub OAuth authentication
 *     tags:
 *       - Users
 *     responses:
 *       302:
 *         description: Redirects to GitHub OAuth consent screen
 */
router.get('/github', passport.authenticate("github", { scope: ["profile", "email"] }))

/**
 * @swagger
 * /api/users/github/callback:
 *   get:
 *     summary: GitHub OAuth callback
 *     tags:
 *       - Users
 *     parameters:
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: Authorization code received from GitHub
 *       - in: query
 *         name: state
 *         schema:
 *           type: string
 *         required: true
 *         description: State parameter for security
 *     responses:
 *       302:
 *         description: Redirects to success or failure page based on authentication result
 */
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/api/users/failure', successRedirect: '/api/users/success' }))

/**
 * @swagger
 * /api/users/success:
 *   get:
 *     summary: Success page after successful authentication
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Success page
 */
router.get('/success', sucessPage)
/**
 * @swagger
 * /api/users/failure:
 *   get:
 *     summary: Failure page after unsuccessful authentication
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Failure page
 */
router.get('/failure', failurePage)

/**
 * @swagger
 * /api/users/devices:
 *   get:
 *     summary: Get devices for a user
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: List of devices for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '../models/DeviceModel.ts'
 *       500:
 *         description: Internal server error
 */
router.get('/devices', getDevices)
router.get('/value', value)
/**
 * @swagger
 * /api/users/allusers:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cached:
 *                   type: boolean
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '../models/UserModel' 
 *       500:
 *         description: Internal server error
 */
router.get('/allusers', getAllUsers);


export default router