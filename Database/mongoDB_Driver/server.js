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
    const data = await connectData();
    const result = await data.collection("user").insertOne({
        name: "palak",
        gender: "female",
        email: "palak76@gmail.com"
    });
    console.log("data added successfully");
    return result
}

const getUsers = async () => {
    const data = await connectData();
    const user = await data.collection("user").find().toArray();
    console.log("users:", user)
};

const deleteUser = async () => {
    const data = await connectData();
    const user = await data.collection("user").find().toArray();
    await data.collection("user").deleteOne({
        _id: user[0]._id
    })
    console.log(user[0]._id.toJSON(), " data deleted successfully");

}

const updateUser = async () => {
    const data = await connectData();
    const user = await data.collection("user").find().toArray();
    await data.collection("user").updateOne({
        _id: user[0]._id,

    }, {
        $set: { name: "jyoti", email: "jyoti32@gmail.com" }
    });
    console.log(user[0]._id, "data is updated");
}

updateUser()
// deleteUser()
// add_student()
getUsers()
