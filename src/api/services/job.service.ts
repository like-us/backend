import { ClientContact, Job, JobBudget, JobHomeOwnership, JobStage, JobStartDay } from '../models'
import { NewJob } from '../interfaces/Job'
import { ClientContact as ClientContactType } from '../interfaces/ClientContact'
import APIError from '../helpers/APIError'
import status from 'http-status'

const getJobById = async (id: string) => {
	return Job.findById(id)
		.populate('clientContact')
		.populate('startDay', 'name')
		.populate('jobStage', 'name')
		.populate('homeOwnership', 'name')
		.populate('jobBudget', 'name')
}

const getAllJobs = async () => {
	return Job.find({})
		.populate('startDay', 'name')
		.populate('jobStage', 'name')
		.populate('homeOwnership', 'name')
		.populate('jobBudget', 'name')
}
const createJob = async (newJob: NewJob, clientContact: ClientContactType) => {
	const contact = new ClientContact({ ...clientContact })
	const savedContact = await contact.save()
	const job = new Job({ ...newJob, clientContact: savedContact.id })

	return (await job.save()).populate('clientContact')
}
const updateJob = (id: string, body: Partial<NewJob>) => {
	return Job.findByIdAndUpdate(id, { ...body }, { new: true })
}

const deleteJob = async (id: string) => {
	await Job.findByIdAndDelete(id)
}

const bidOnJob = async (id: string, userId: string) => {
	const job = await Job.findById(id)

	if (!job) throw new APIError(status.NOT_FOUND, `Job not found`)

	return job.bid(userId)
}

const getJobsForUser = async (userId: string) => {
	return Job.find({ createdBy: userId, deleted: false })
}

export default {
	getJobById,
	getAllJobs,
	createJob,
	updateJob,
	deleteJob,
	bidOnJob,
	getJobsForUser,
}
