const mongoose = require('mongoose');

const MovieCollectionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String },
    genre: { type: String },
    content: { type: Array }
}, {
    timestamps: trusted
});

module.exports = mongoose.model("MovieCollection", MovieCollectionSchema);