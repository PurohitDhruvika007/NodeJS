import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/bookstore");
        console.log("database connected successfully !!")
    }
    catch (err) {
        console.log("error : ", err)
    }
}