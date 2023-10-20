import Joi from 'joi'
export default {
	newNews: Joi.object({
		title: Joi.string().required(),
		shortDescription: Joi.string().required(),
		body: Joi.string().required(),
	}),
	updateNews: Joi.object({
		title: Joi.string().optional(),
		shortDescription: Joi.string().optional(),
		body: Joi.string().optional(),
	}),
}
