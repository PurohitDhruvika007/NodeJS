import express from "express"
import { MongoClient } from "mongodb";

const app = express();
app.use(express.json());

const client = new MongoClient("mongodb://127.0.0.1:27017");
const dbname = "student";

const connectData = async () => {
    await client.connect();
    console.log("database connected successfully")
    return client.db(dbname)
}



const add_student = async () => {
    const db = await connectData();
    const result = await db.collection("user").insertOne({
        name: "arpita",
        gender: "female",
        email: "arpita12@gmail.com"
    })
    console.log("data added")
    return result;

}

const getUsers = async () => {
    const db = await connectData();
    const users = await db.collection("user").find().toArray();
    console.log("Users:", users);
};

// add_student()
getUsers()