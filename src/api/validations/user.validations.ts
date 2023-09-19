import Joi from 'joi'
import { LoginUser, NewUser } from '../interfaces/User'
export default {
	newUser: Joi.object<NewUser>({
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
		email: Joi.string().email().required(),
		postcode: Joi.string().required(),
		phone: Joi.string().required(),
	}),
	userToTradersPerson: Joi.object({
		phone: Joi.string().required(),
	}),
	loginUser: Joi.object<LoginUser>({
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	}),
	updateUser: Joi.object<NewUser>({
		firstName: Joi.string().optional(),
		lastName: Joi.string().optional(),
		email: Joi.string().email().optional(),
		password: Joi.string().optional(),
		username: Joi.string().optional(),
		phone: Joi.string().optional(),
		postcode: Joi.string().optional()
	}),
}
