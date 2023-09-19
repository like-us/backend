import { Schema, model } from 'mongoose'

export interface IClientContact {
	firstName: string
	lastName: string
	email: string
	phone: string
}

const schema = new Schema<IClientContact>(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true },
		phone: { type: String, required: true },
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

const ClientContact = model<IClientContact>('ClientContact', schema)

export default ClientContact
