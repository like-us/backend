import express from 'express'
import { authController } from '../controllers'
import validator from '../middlewares/validator'

const router = express.Router()


/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API responsible for all authentication services for the admin users only 
 */


/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Sign In an admin.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Successful login
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */

router.post(
	'/login',
	authController.login
)


export default router
