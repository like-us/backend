import { Schema, model, Document, SchemaTypes } from 'mongoose';



const schema = new Schema(
        {
                reviewer: {
                        type: SchemaTypes.ObjectId,
                        required: true,
                        ref:"User"
                },
                content: {
                        type: String,
                        required: true,
                },
                rating: {
                        type: Number,
                        required: true
                }
        },
        {
                timestamps: true,
        }
);

const ProfileReview = model('ProfileReview', schema);

export default ProfileReview;
