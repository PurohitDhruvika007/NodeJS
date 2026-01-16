import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
    }
    catch (err) {
        console.log("server not connected !!", err);
    }
}