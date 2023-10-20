import Joi from 'joi'
export default {
	newTestimonial: Joi.object({
		title: Joi.string().required(),
		name: Joi.string().required(),
		email: Joi.string().required(),
		phone: Joi.string().required(),
		address: Joi.string().required(),
		body: Joi.string().required(),
	}),
	updateTestimonial: Joi.object({
		title: Joi.string().optional(),
		name: Joi.string().optional(),
		email: Joi.string().optional(),
		phone: Joi.string().optional(),
		address: Joi.string().optional(),
		body: Joi.string().optional(),
	}),
}
