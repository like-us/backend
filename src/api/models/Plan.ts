import { Schema, model } from 'mongoose';



const schema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		options: [{
			type: String,
			required: true,
		}],
		description: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Plan = model('Plan', schema);

export default Plan;
