import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pfp: { type: String, default: "" },
    isAdmin: { type: Boolean, default: false } // TODO : USER ROLES LIST
}, {
    timestamps: true
});

export default model("User", UserSchema);