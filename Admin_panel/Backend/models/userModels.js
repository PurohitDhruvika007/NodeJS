import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },

    name: {
        type: String,
        default: ""
    },

    phone: {
        type: String,
        default: ""
    },

    age: {
        type: Number,
        default: null
    },

    address: {
        type: String,
        default: ""
    },

    education: {
        type: String,
        default: ""
    },

    image: {
        type: String,
        default: ""
    },

    experience: {
        type: String,
        default: ""
    },

    role: {
        type: String,
        default: ""
    }
}, { timestamps: true });

export const UserCollection = mongoose.model("users", userSchema);
