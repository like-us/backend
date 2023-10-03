import { Schema, model, Model, Document, Types } from 'mongoose'

export interface IUser {
	name: string
	email: string
	password: string
	username: string
	coins: number;
	friendRequests: Types.ObjectId[]
	plan: Types.ObjectId
	sentRequests: Types.ObjectId[]
	followers: Types.ObjectId[]
	following: Types.ObjectId[]
	posts: Types.ObjectId[],
	profile: string;
	phone?: string;
	bio?: string;
}

export interface IUserMethods {
	toJsonWithoutPassword(): Partial<Document<IUser>>
}

type UserModel = Model<IUser, Record<string, never>, IUserMethods>

const schema = new Schema<IUser, UserModel>(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, lowercase: true },
		password: { type: String, required: true },
		phone: { type: String, unique: true },
		friendRequests: { type: [Schema.ObjectId], ref: 'User', },
		sentRequests: { type: [Schema.ObjectId], ref: 'User', },
		followers: { type: [Schema.ObjectId], ref: 'User', },
		following: { type: [Schema.ObjectId], ref: 'User', },
		posts: { type: [Schema.ObjectId], ref: 'User', },
		plan: { type: Schema.ObjectId, ref: 'Plans', },
		coins: { type: Number, default: 0 },
		profile: { type: String, },
		bio: { type: String, },
		username: { type: String, required: true },
	},
	{
		timestamps: true,
	}
)

schema.index({
	name: 'text',
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
