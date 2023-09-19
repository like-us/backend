import { Schema, model, Document, SchemaTypes } from 'mongoose';



const schema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		trades: [
			{
				type: SchemaTypes.ObjectId,
				ref: "Trade"
			}
		]
	},
);

const TradeType = model('Tradetype', schema);

export default TradeType;
