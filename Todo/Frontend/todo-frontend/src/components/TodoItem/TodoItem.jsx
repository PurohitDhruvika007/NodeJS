import React from "react";

export default function TodoItem({ todo, handleEdit, handleDelete }) {
    return (
        <div style={{ border: "1px solid gray", padding: "10px", margin: "10px" }}>
            <h4 style={{ textDecoration: todo.completed ? "line-through" : "" }}>
                {todo.title}
            </h4>
            <p>{todo.description}</p>
            <p>Status: {todo.completed ? "Completed" : "Incomplete"}</p>

            <div style={{ display: "flex", gap: "10px" }}>
                {/* Pass the todo object to handleEdit */}
                <button onClick={() => handleEdit(todo)}>Edit</button>
                <button onClick={() => handleDelete(todo._id)}>Delete</button>
            </div>
        </div>
    );
}