import { Schema, model } from 'mongoose';


const schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        address: { type: String, required: true },
        phone: { type: String, required: true },
        body: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const Testimonial = model('Testimonial', schema);

export default Testimonial;
