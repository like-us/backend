import Joi from 'joi'
export default {
	newTestimonial: Joi.object({
		title: Joi.string().required(),
		body: Joi.string().required(),
	}),
	updateTestimonial: Joi.object({
		title: Joi.string().optional(),
		body: Joi.string().optional(),
	}),
}
