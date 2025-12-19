import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
const PORT = 4000;

const connectData = async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/company");
}

const companySchema = new mongoose.Schema({
    name: String,
    year: Number,
    owner: String,
    netWorth: Number
})

const Company = mongoose.model("company", companySchema)

const addCompany = () => {
    const company = new Company(
        {
            name: "abc",
            year: 2002,
            owner: "reem",
            netWorth: 10000000
        }
    )
    company.save();

}

connectData();
app.post("/", async (req, res) => {
    addCompany();
})
app.get("/", async (req, res) => {

})
app.listen(PORT, () => {
    console.log(`server connected successfully on http://localhost:${PORT}/`);
})