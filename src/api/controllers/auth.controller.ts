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



export default {
	login,
}
