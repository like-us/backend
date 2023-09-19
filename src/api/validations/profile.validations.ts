import Joi from 'joi'
import idSchema from './id.validation'


export default {
        requestProfile: Joi.object({
                phoneNumber: Joi.string().required()
        }),
        updateProfile: Joi.object({
                company: Joi.string().optional(),
                about: Joi.string().optional(),
                location: Joi.string().optional(),
                ratings: Joi.number().optional(),
                phoneNumber: Joi.string().optional(),
                services: Joi.array().items(idSchema.required()),
                // tradeType: Joi.array().items(idSchema.required()),
                reviews: Joi.array().items(idSchema.required()),
        }),
        reviewProfile: Joi.object({
                reviewer: idSchema.required(),
                content: Joi.string().required(),
                rating: Joi.number().required()
        })
}