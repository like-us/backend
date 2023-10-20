import Joi from 'joi'
export default {
    createContact: Joi.object({
        name: Joi.string().required(),
        phone: Joi.string().required(),
        email: Joi.string().email().required(),
        address: Joi.string().required(),
        message: Joi.string().required(),
    }),
}
