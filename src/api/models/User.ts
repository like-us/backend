import { Schema, model, Model, Document, Types } from 'mongoose'

export interface IUser {
	firstName: string
	lastName: string
	email: string
	postcode: string
	password: string
	username: string
	phone: string
	deleted: boolean
	suspended: boolean
	emailVerified: boolean
	phoneVerified: boolean
	role: string
	credits: number
	profile?: Types.ObjectId
	accessToProfile: boolean
}

export interface IUserMethods {
	toJsonWithoutPassword(): Partial<Document<IUser>>
}

type UserModel = Model<IUser, Record<string, never>, IUserMethods>

const schema = new Schema<IUser, UserModel>(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true, lowercase: true },
		emailVerified: { type: Boolean, default: false },
		password: { type: String, required: true },
		postcode: { type: String, required: true },
		phone: { type: String, required: true, unique: true },
		phoneVerified: { type: Boolean, default: false },
		deleted: { type: Boolean, default: false, required: true },
		suspended: { type: Boolean, default: false },
		credits: { type: Number, default: 0 },
		profile: { type: Schema.ObjectId, ref: 'Profile' },
	},
	{
		timestamps: true,
	}
)

schema.index({
	firstName: 'text',
	lastName: 'text',
	email: 'text',
})

schema.set('toJSON', {
	transform: (_document: any, returnedObject: any) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	},
})

schema.method('toJsonWithoutPassword', function toJsonWithoutPassword() {
	const userObject: any = this.toJSON()
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { password, ...userWithoutPassword } = userObject
	return userWithoutPassword
})

schema.virtual('role').get(function () {
	return 'USER'
})

const User = model<IUser, UserModel>('User', schema)

export default User
