import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    title: String,
    description: String,
    Completed: { type: Boolean, default: false }, // match database field name
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth"
    }
}, { timestamps: true });

export const TodoCollection = mongoose.model("Todo", TodoSchema);