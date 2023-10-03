import { Schema, model, Model, Document, Types } from 'mongoose';


const schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        address: { type: String, required: true },
        title: { type: String, required: true },
        shortDescription: { type: String, required: true },
        images: [{ type: String, required: true }],
        body: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const Testimonial = model('Testimonial', schema);

export default Testimonial;
