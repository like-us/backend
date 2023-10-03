import { User } from '../models'
import APIError from '../helpers/APIError'
import status from 'http-status'
import bcrypt from 'bcryptjs'
import config from '../../config/config'
import { NewUser } from '../interfaces/User'
import { createAuthToken } from '../helpers/authToken'
import { generateAppToken, verifyAppToken } from '../helpers/emailToken'
import mailer from '../helpers/mailer'
import userService from './testimonial.service'

const login = async ({
	email,
	password,
}: {
	email: string
	password: string
}) => {
	const user = await User.findOne({ email })
	if (!user) throw new APIError(status.UNAUTHORIZED, 'Email does not exist')
	const isValidPassword = await bcrypt.compare(password, user.password)
	if (!isValidPassword)
		throw new APIError(status.UNAUTHORIZED, 'Incorrect password')

	return {
		token: createAuthToken({
			id: user.id,
			email: user.email,
			name: user.name,
			username: user.username,
		}),
		user: user.toJsonWithoutPassword(),
	}
}

const register = async (body: NewUser) => {
	const user = await userService.createUser(body)
	const token = await generateAppToken(user.email, 'VERIFY_EMAIL')
	return {
		token: createAuthToken({
			id: user.id,
			name: body.name,
			username: body.username,
			email: body.email,
		}),
		user: user.toJsonWithoutPassword(),
	}
}

const newPassword = async ({
	password,
	email,
	token,
}: {
	password: string
	email: string
	token: string
}) => {
	const verifiedTokenPayload = await verifyAppToken(
		email,
		token,
		'PASSWORD_RESET'
	)

	if (verifiedTokenPayload) {
		const hashedPass = await bcrypt.hash(password, config.BCRYPT_SALT)

		await User.updateOne({ email }, { password: hashedPass })

		return { msg: 'Password updated successfully' }
	} else {
		throw new APIError(status.BAD_REQUEST, 'Token invalid or expired')
	}
}

const forgotPassword = async (email: string) => {
	const token = await generateAppToken(email, 'PASSWORD_RESET')

	// todo: Get app url from config instead of hardcoding
	mailer.sendPasswordResetEmail(
		email,
		`${config.CLIENT_URL}/new-password?email=${email}&token=${token}`
	)

	return { token, msg: 'Please check your email for the password reset link' }
}

const verifyMail = async ({
	email,
	token,
}: {
	email: string
	token: string
}) => {
	const validToken = await verifyAppToken(email, token, 'VERIFY_EMAIL')

	if (!validToken)
		throw new APIError(status.BAD_REQUEST, `Token invalid or expired`)

	const user = await User.findOneAndUpdate(
		{ email },
		{ emailVerified: true },
		{ new: true }
	)

	return {
		user: user!.toJsonWithoutPassword(),
		msg: 'Email verified successfully',
	}
}

const sendVerifyEmail = async (email: string) => {
	const token = await generateAppToken(email, 'VERIFY_EMAIL')

	// todo: Get app url from config instead of hardcoding
	mailer.sendVerificationEmail(
		email,
		`${config.CLIENT_URL}/verifyMail?token=${token}&email=${email}`
	)

	return { token }
}



export default {
	login,
	register,
	forgotPassword,
	newPassword,
	verifyMail,
	sendVerifyEmail,
}


