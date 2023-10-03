import Joi from 'joi'
import { LoginUser, NewUser } from '../interfaces/User'
export default {
	newUser: Joi.object({
		name: Joi.string().required(),
		username: Joi.string().required(),
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	}),
	loginUser: Joi.object<LoginUser>({
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	}),
	updateUser: Joi.object<NewUser>({
		name: Joi.string().optional(),
		username: Joi.string().optional(),
		email: Joi.string().email().optional(),
		password: Joi.string().optional(),
		bio: Joi.string().optional(),
		phone: Joi.string().optional(),
	}),
}
