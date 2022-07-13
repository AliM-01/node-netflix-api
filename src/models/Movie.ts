import { Schema, model } from 'mongoose';

const MovieSchema = new Schema({
    title: { type: String, required: true },
    desc: { type: String },
    posterImg: { type: String },
    titleImg: { type: String },
    thumbnailImg: { type: String },
    trailer: { type: String },
    video: { type: String },
    year: { type: String },
    limit: { type: Number },
    genre: { type: String },
    isMovie: { type: Boolean, default: true }, // TODO : MOVIE TYPE ENUM
    isSeries: { type: Boolean, default: false },

}, {
    timestamps: true
});

module.exports = model("Movie", MovieSchema);