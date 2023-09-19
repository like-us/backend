import { Schema, model, Types } from 'mongoose'

export interface IBid {
	amount: number
	bidder: Types.ObjectId
	job: Types.ObjectId
}

const schema = new Schema<IBid>(
	{
		amount: { type: Number, required: true },
		bidder: { type: Schema.ObjectId, ref: 'User' },
		job: { type: Schema.ObjectId, ref: 'Job' },
	},
	{
		timestamps: true,
	}
)

schema.set('toJSON', {
	transform: (_document: any, returnedObject: any) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	},
})

const Bid = model<IBid>('Bid', schema)

export default Bid
