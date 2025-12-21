import model from "../models/bookModel.js";


export const addBook = async (req, res) => {
    try {
        const book = await model.create(req.body);
        res.status(201).json({ message: "data inserted succesfully", data: book });
    }
    catch (err) {
        res.status(400).json({ message: err });
    }
}

export const readBook = async (req, res) => {
    try {
        const data = await model.find();
        res.status(200).json(data);
    }
    catch (err) {
        res.json({ err: err })
    }
}

export const updateBook = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const update = await model.findByIdAndUpdate(id, data, { new: true });
        res.json({ message: "data updated successfully", update });
    }
    catch (err) {
        res.json({ err: err });
    }
}

export const deleteBook = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteData = await model.findByIdAndDelete(id);
        res.json({ message: "data deleted successfully", deleteData })
    }
    catch (err) {
        res.json({ err: err })
    }
}