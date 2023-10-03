import Joi from 'joi'
export default {
	newUser: Joi.object({
		name: Joi.string().required(),
		username: Joi.string().required(),
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	}),
	loginUser: Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	}),
	updateUser: Joi.object({
		name: Joi.string().optional(),
		username: Joi.string().optional(),
		email: Joi.string().email().optional(),
		password: Joi.string().optional(),
		bio: Joi.string().optional(),
		phone: Joi.string().optional(),
	}),
}
