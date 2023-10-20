import Joi from 'joi'
export default {
	newNews: Joi.object({
		title: Joi.string().required(),
		body: Joi.string().required(),
	}),
	updateNews: Joi.object({
		title: Joi.string().optional(),
		body: Joi.string().optional(),
	}),
}
