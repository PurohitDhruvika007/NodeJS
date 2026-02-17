import mongoose from "mongoose";

// ================= ADMIN SCHEMA =================
const adminSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "auth", required: true },

    department: {
        type: String,
        required: [true, "Department is required"],
        trim: true
    },

    designation: {
        type: String,
        required: [true, "Designation is required"],
        trim: true
    },

    phone: {
        type: String,
        required: [true, "Phone number is required"],
        trim: true,
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v); // exactly 10 digits
            },
            message: props => `${props.value} is not a valid 10-digit phone number!`
        }
    },

    emergencyContact: {
        type: String,
        trim: true,
        validate: {
            validator: function (v) {
                return !v || /^\d{10}$/.test(v); // optional, but must be 10 digits if provided
            },
            message: props => `${props.value} is not a valid 10-digit phone number!`
        }
    },

    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        default: "Other"
    },

    dob: { type: Date },

    address: { type: String, trim: true },

    bio: { type: String, trim: true },

    status: { type: String, enum: ["active", "inactive"], default: "active" },

    photo: { type: String }
}, { timestamps: true });

// ================= ADMIN COLLECTION =================
export const adminCollection = mongoose.model("admin", adminSchema);
