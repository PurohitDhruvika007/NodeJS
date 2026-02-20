import { TodoCollection } from "../models/todoModel.js";

// Add Todo
export const addTodo = async (req, res) => {
    try {
        const data = await TodoCollection.create({
            ...req.body,
            userId: req.userId
        });
        res.json({ status: true, message: "Todo added successfully", data });
    } catch (err) {
        res.json({ status: false, message: err.message });
    }
}

// Read Todos (only for logged-in user)
export const readTodo = async (req, res) => {
    try {
        const data = await TodoCollection.find({ userId: req.userId });
        res.json({ status: true, message: "Todos fetched successfully", data });
    } catch (err) {
        res.json({ status: false, message: err.message });
    }
}

export const updateTodo = async (req, res) => {
    const id = req.params.id;
    const { title, description, completed } = req.body; // completed from frontend (boolean)

    try {
        const updatedTodo = await TodoCollection.findOneAndUpdate(
            { _id: id, userId: req.userId },
            {
                title,
                description,
                Completed: completed // map frontend completed to DB field
            },
            { new: true } // return updated doc
        );

        if (!updatedTodo) {
            return res.json({ status: false, message: "Todo not found or unauthorized" });
        }

        res.json({ status: true, message: "Todo updated successfully", data: updatedTodo });
    } catch (err) {
        res.json({ status: false, message: err.message });
    }
};

// Delete Todo
export const deleteTodo = async (req, res) => {
    const id = req.params.id;
    try {
        await TodoCollection.deleteOne({ _id: id, userId: req.userId });
        res.json({ status: true, message: "Todo deleted successfully" });
    } catch (err) {
        res.json({ status: false, message: err.message });
    }
}