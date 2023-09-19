import { Schema, model, Types, Model, Document } from 'mongoose'
import Bid, { IBid } from './Bid'
import User from './User'
import APIError from '../helpers/APIError'
import status from 'http-status'

export interface IJob {
	title: string
	description: string
	startDay: Types.ObjectId
	jobStage: Types.ObjectId
	homeOwnership: Types.ObjectId
	// photos and videos
	bids: Types.DocumentArray<IBid>
	jobBudget: Types.ObjectId
	clientContact: Types.ObjectId
	trade: Types.ObjectId
	createdBy: Types.ObjectId
	review?: string
	deleted: boolean
}

export interface IJobMethods {
	bid(userId: string): Promise<Document<IBid>>
}

type JobModel = Model<IJob, Record<string, never>, IJobMethods>

const schema = new Schema<IJob, JobModel>(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		bids: [{ type: Schema.ObjectId, ref: 'Bid' }],
		startDay: { type: Schema.ObjectId, ref: 'JobStartDay' },
		jobStage: { type: Schema.ObjectId, ref: 'JobStage' },
		homeOwnership: { type: Schema.ObjectId, ref: 'JobHomeOwnership' },
		jobBudget: { type: Schema.ObjectId, ref: 'JobBudget' },
		clientContact: { type: Schema.ObjectId, ref: 'ClientContact' },
		trade: { type: Schema.ObjectId, ref: 'Trade' },
		review: { type: String },
		createdBy: { type: Schema.ObjectId, ref: 'User' },
		deleted: { type: Boolean, default: false, required: true },
	},
	{
		timestamps: true,
	}
)

schema.index({ title: 'text', description: 'text' })

schema.set('toJSON', {
	transform: (_document: any, returnedObject: any) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	},
})

schema.method('bid', async function (userId: string) {
	const MINIMUM_CREDITS = 3

	const job = await this.populate('bids')

	if (job.bids.some((bid: IBid) => bid.bidder.toString() === userId))
		throw new APIError(status.BAD_REQUEST, 'You have already bid on this Job')

	if (job.bids.length >= 3)
		throw new APIError(status.BAD_REQUEST, 'Maximum bids reached for this job')

	const user = await User.findById(userId)

	if (!user)
		throw new APIError(status.BAD_REQUEST, 'You need to login to bid on jobs')

	if (user.credits < MINIMUM_CREDITS)
		throw new APIError(
			status.BAD_REQUEST,
			'Your credits are not enough to make this bid'
		)

	const bid = await Bid.create({
		amount: MINIMUM_CREDITS,
		bidder: userId,
		job: this.id,
	})

	job.bids.push(bid)
	job.credits  = job.credits-MINIMUM_CREDITS

	await job.save()

	return bid
})

const Job = model<IJob, JobModel>('Job', schema)

export default Job
