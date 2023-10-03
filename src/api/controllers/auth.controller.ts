import { Request, Response, NextFunction } from 'express'
import { authService } from '../services'


const login = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const {
			body: { email, password },
		} = req
		const authBody = await authService.login({ email, password })
		res.status(200).json(authBody)
	} catch (err) {
		next(err)
	}
}

const register = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { body } = req
		const user = await authService.register(body)
		res.status(200).json(user)
	} catch (err) {
		next(err)
	}
}


const forgotPassword = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const {
			body: { email },
		} = req

		const response = await authService.forgotPassword(email)

		res.status(200).json(response)
	} catch (err) {
		next(err)
	}
}

const newPassword = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const {
			body: { password, email, token },
		} = req

		const response = await authService.newPassword({ password, email, token })

		res.status(200).json(response)
	} catch (err) {
		next(err)
	}
}

const verifyMail = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const {
			body: { email, token },
		} = req

		const response = await authService.verifyMail({ email, token })

		res.status(200).json(response)
	} catch (err) {
		next(err)
	}
}

const sendVerifyMail = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const {
			body: { email },
		} = req

		const response = await authService.sendVerifyEmail(email)

		res.status(200).json(response)
	} catch (err) {
		next(err)
	}
}



export default {
	login,
	register,
	verifyMail,
	forgotPassword,
	newPassword,
	sendVerifyMail,
}
