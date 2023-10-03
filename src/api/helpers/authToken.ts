import jwt from 'jsonwebtoken'
import config from '../../config/config'
export interface Payload {
	id: string
	email: string
	name: string
	username: string
}

export const createAuthToken = (payload: Payload) => {
	return jwt.sign(payload, config.JWT_SECRET, {
		expiresIn: '7d',
	})
}

export const verifyAuthToken = (token: string) => {
	return jwt.verify(token, config.JWT_SECRET)
}
