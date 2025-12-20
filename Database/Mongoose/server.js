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

const addCompany = async (data) => {
    const company = new Company(data)
    let result = await company.save();
    return result;

}
const readData = async () => {
    const result = await Company.find()
    return result;
}

const deleteCompany = async (id) => {
    const result = await Company.deleteOne({ _id: id });
    return result;
}

const updateCompany = async (id, data) => {
    const result = await Company.updateOne({ _id: id }, { $set: data });
    return result;
}

connectData();
app.post("/", async (req, res) => {
    const data = await addCompany(req.body);
    res.json({ msg: "data inserted successfully", data: data });
});
app.get("/", async (req, res) => {
    const data = await readData();
    res.json(data);
})
app.delete("/:id", async (req, res) => {
    const id = req.params.id;
    await deleteCompany(id);
    const data = await readData();
    res.json({ msg: "data deleted successfully", data: data });
})

app.put("/:id", async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const result = updateCompany(id, data)
    res.json({ msg: "data updated successfully", data: result });
})
app.listen(PORT, () => {
    console.log(`server connected successfully on http://localhost:${PORT}/`);
})