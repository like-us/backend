import { User } from '../models'
import APIError from '../helpers/APIError'
import status from 'http-status'
import bcrypt from 'bcryptjs'
import { createAuthToken } from '../helpers/authToken'

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



export default {
	login,
}


