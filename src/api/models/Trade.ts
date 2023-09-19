import { Schema, model } from "mongoose"

const schema = new Schema(
	{
		name: { type: String, required: true },
	},
)

const Trade = model('Trade', schema)

export default Trade
