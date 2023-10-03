import express from 'express'
import { authController } from '../controllers'
import validator from '../middlewares/validator'
import {
	authValidation,
	userValidations,
} from '../validations'

const router = express.Router()


router.post(
	'/login',
	validator.body(userValidations.loginUser),
	authController.login
)


export default router
