const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
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

module.exports = mongoose.model("Movie", MovieSchema);