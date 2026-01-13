import mongoose from "mongoose";
export const ConnectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/otp");
        console.log('mongoDB connected successfully');
    }
    catch (err) {
        console.log('mongoDB not connected');
    }
}