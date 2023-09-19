import Joi from 'joi'
import { NewJob } from '../interfaces/Job'
import idSchema from './id.validation'

const id = idSchema.required()

export default {
	newJob: Joi.object<NewJob>({
		title: Joi.string().required(),
		description: Joi.string().required(),
		startDay: Joi.string().required(),
		jobStage: Joi.string().required(),
		homeOwnership: Joi.string().required(),
		jobBudget: Joi.string().required(),
		createdBy: Joi.string().required(),
		clientContact: Joi.object({
			firstName: Joi.string().required(),
			lastName: Joi.string().required(),
			email: Joi.string().required(),
			phone: Joi.string().required(),
		}).required(),
	}),
	updateJob: Joi.object<Omit<NewJob, 'clientContact'>>({
		title: Joi.string().required(),
		description: Joi.string().required(),
		startDay: id,
		jobStage: id,
		homeOwnership: id,
		jobBudget: id,
	}),
}
