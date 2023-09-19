import express from 'express'
import { authController } from '../controllers'
import validator from '../middlewares/validator'
import {
	adminValidations,
	authValidation,
	userValidations,
} from '../validations'

const router = express.Router()


router.post(
	'/login',
	validator.body(userValidations.loginUser),
	authController.login
)
router.post(
	'/register',
	validator.body(userValidations.newUser),
	authController.register
)



router.post(
	'/forgot-password',
	validator.body(authValidation.forgotPassword),
	authController.forgotPassword
)

router.post(
	'/new-password',
	validator.body(authValidation.newPassword),
	authController.newPassword
)

router.post(
	'/admin/login',
	validator.body(adminValidations.loginAdmin),
	authController.loginAdmin
)

router.post(
	'/verifyMail',
	validator.body(authValidation.verifyMail),
	authController.verifyMail
)


router.post(
	'/send-verification-email',
	validator.body(authValidation.sendVerifyMail),
	authController.sendVerifyMail
)

export default router
