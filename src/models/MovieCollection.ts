import { Schema, model } from 'mongoose';

const MovieCollectionSchema = new Schema({
    title: { type: String, required: true },
    type: { type: String },
    genre: { type: String },
    content: { type: Array }
}, {
    timestamps: true
});

export default model("MovieCollection", MovieCollectionSchema);