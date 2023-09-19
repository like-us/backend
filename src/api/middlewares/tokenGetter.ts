import { NextFunction, Request, Response } from 'express'

export interface ITokenRequest extends Request {
	token?: string
}

export default function tokenGetter(
	req: ITokenRequest,
	_: Response,
	next: NextFunction
) {
	const authHeader = req.headers['authorization']
	if (authHeader && authHeader.startsWith('Bearer ')) {
		// Remove "Bearer " prefix to get the token
		req.token = authHeader.substring(7) // Add the token to the request object for later use if needed
	}
	next()
}
