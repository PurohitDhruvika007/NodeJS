import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    age: { type: Number, required: true },
    address: { type: String, required: true },
    education: { type: String, required: true },
    image: { type: String, required: true },
    experience: { type: String, required: true },
}, { timestamps: true })

