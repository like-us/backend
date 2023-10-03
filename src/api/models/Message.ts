import { Schema, Types, model } from 'mongoose';


export interface IMessage {
        sender: Types.ObjectId,
        image?: string,
        content?: string,
        chat: Types.ObjectId,
}

const schema = new Schema<IMessage>(
        {
                sender: {
                        type: Schema.Types.ObjectId,
                        ref: 'User',
                },
                image: { type: String },
                content: { type: String },
                chat:{
                        type: Schema.Types.ObjectId,
                        ref: 'Chat',
                }
        },
        {
                timestamps: true
        }
);

schema.set('toJSON', {
        transform: (_document: any, returnedObject: any) => {
                returnedObject.id = returnedObject._id.toString()
                delete returnedObject._id
                delete returnedObject.__v
        },
})

const Message = model<IMessage>('Message', schema);

export default Message
