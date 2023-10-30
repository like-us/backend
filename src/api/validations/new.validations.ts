import Joi from 'joi'
export default {
  newNews: Joi.object({
    title: Joi.string().required(),
    category: Joi.string().required(),
    shortDescription: Joi.string().required(),
    body: Joi.string().required(),
    images: Joi.array().items(Joi.any()),
  }),
  updateNews: Joi.object({
    title: Joi.string().optional(),
    category: Joi.string().optional(),
    shortDescription: Joi.string().optional(),
    body: Joi.string().optional(),
    images: Joi.array().items(Joi.any()),
  }),
}
