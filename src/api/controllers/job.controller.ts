import { NextFunction, Request, Response } from 'express'
import { jobService } from '../services'
import status from 'http-status'
import APIError from '../helpers/APIError'
import { IUserRequest } from '../middlewares/accessControl'
import paginate from '../helpers/paginate'
import { Job } from '../models'

const getJob = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const job = await jobService.getJobById(req.params.id)

		if (!job) throw new APIError(status.NOT_FOUND, 'Job not found')

		res.json(job)
	} catch (err) {
		next(err)
	}
}

const getAllJobs = async (_req: Request, res: Response, next: NextFunction) => {
	try {
		const jobs = await jobService.getAllJobs()
		res.json(jobs)
	} catch (err) {
		next(err)
	}
}

const createJob = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const {
			body: { clientContact, ...rest },
		} = req

		const savedJob = await jobService.createJob(rest, clientContact)

		res.status(status.CREATED).json(savedJob)
	} catch (err) {
		next(err)
	}
}

const updateJob = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = req.params.id
		const { body } = req

		const updatedJob = await jobService.updateJob(id, body)

		if (!updatedJob) throw new APIError(status.NOT_FOUND, 'Job does not exist')

		res.status(status.OK).json(updatedJob)
	} catch (err) {
		next(err)
	}
}

const deleteJob = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await jobService.deleteJob(req.params.id)
		res.status(status.NO_CONTENT).end()
	} catch (err) {
		next(err)
	}
}

const bidOnJob = async (
	req: IUserRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		if (!req.user)
			throw new APIError(
				status.UNAUTHORIZED,
				'You need to be authenticated first'
			)

		const bid = await jobService.bidOnJob(req.params.id, req.user.id)

		res.json(bid)
	} catch (err) {
		next(err)
	}
}

const searchJob = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await paginate(req, Job, [
			'startDay',
			'jobStage',
			'homeOwnership',
			'jobBudget',
			'clientContact',
		])

		res.status(status.OK).json(response)
	} catch (err) {
		next(err)
	}
}

const getJobsForUser = async (
	req: IUserRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		if (!req.user)
			throw new APIError(
				status.UNAUTHORIZED,
				'You need to be authenticated first'
			)

		if (req.user.role === 'USER' && req.user.id !== req.params.id) {
			throw new APIError(
				status.UNAUTHORIZED,
				'You cannot get jobs for another user'
			)
		}

		const id =
			req.user.role === 'USER' ? req.user.id : (req.params.id as string)

		const jobsForUser = await jobService.getJobsForUser(id)

		res.json(jobsForUser)
	} catch (err) {
		next(err)
	}
}

export default {
	getJob,
	bidOnJob,
	getAllJobs,
	createJob,
	updateJob,
	deleteJob,
	searchJob,
	getJobsForUser,
}
