import { Schema, Types, model } from 'mongoose'

export interface INew {
	title: string;
	shortDescription: string;
	body: string;
	category: string;
	image: string;
	link: string;
}

const schema = new Schema<INew>(
	{
		title: { type: String, required: true },
		shortDescription: { type: String, required: true },
		body: { type: String, required: true },
		category: { type: String, required: true },
		link: { type: String, required: true },
		image: { type: String, required: true },
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

const ANew = model<INew>('ANew', schema)

export default ANew
