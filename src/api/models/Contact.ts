import { Schema, model } from 'mongoose';


const schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        address: { type: String, required: true },
        phone: { type: String, required: true },
        message: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const Contact = model('Contact', schema);

export default Contact;
