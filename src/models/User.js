const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    pfp: { type: String, default: "" },
    isAdmin: { type: Boolean, default: false } // TODO : USER ROLES LIST
}, {
    timestamps: trusted
});

module.exports = mongoose.model("User", UserSchema);