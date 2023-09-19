import { Schema, model, Types } from 'mongoose'

export interface IProfile {
	about: string;
	reviews: Types.ObjectId[];
	ratings: number;
	location: string;
	services: Types.ObjectId[];
	company: string;
	active: boolean;
	tradeType: Types.ObjectId[];
	user: Types.ObjectId;
	phoneNumber: string;
}

const schema = new Schema<IProfile>(
	{
		company: { type: String },
		reviews: [{ type: Schema.ObjectId, ref: 'ProfileReview' }],
		ratings: { type: Number },
		location: { type: String },
		about: { type: String },
		active: { type: Boolean, default: false },
		tradeType: [{ type: Schema.ObjectId, ref: "Tradetype" }],
		services: [{ type: Schema.ObjectId, ref: 'Trade' }],
		phoneNumber: { type: String, required: true },
		user: { type: Schema.ObjectId, ref: "User" }
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

const Profile = model<IProfile>('Profile', schema)

export default Profile
