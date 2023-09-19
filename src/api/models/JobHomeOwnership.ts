import { Schema, model } from 'mongoose'
import { GenericMetadata } from '../interfaces/Metadata'

const schema = new Schema<GenericMetadata>(
	{
		name: { type: String, required: true },
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

const JobHomeOwnership = model<GenericMetadata>('JobHomeOwnership', schema)

export default JobHomeOwnership
