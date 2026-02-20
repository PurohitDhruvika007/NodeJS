import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import './Dashboard.css';

export default function Dashboard() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("incomplete");
    const [editingId, setEditingId] = useState(null);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const navigate = useNavigate();

    useEffect(() => { fetchTodos(); }, []);

    const fetchTodos = async () => {
        try {
            const res = await axios.get("http://localhost:4000/api/todo", { withCredentials: true });
            if (!res.data.status) navigate("/login");
            else setTodos(res.data.data);
        } catch (err) { console.log(err); }
    };

    const handleAddOrUpdate = async () => {
        if (!title) return alert("Title required");

        try {
            const payload = {
                title,
                description,
                Completed: status === "completed" // ✅ Use the correct field name
            };

            let res;
            if (editingId) {
                // Update
                res = await axios.put(
                    `http://localhost:4000/api/todo/${editingId}`,
                    payload,
                    { withCredentials: true }
                );
                if (res.data.status)
                    setTodos(prev => prev.map(t => t._id === editingId ? res.data.data : t));
                else alert(res.data.message);
            } else {
                // Add
                res = await axios.post(
                    "http://localhost:4000/api/todo",
                    payload,
                    { withCredentials: true }
                );
                if (res.data.status) setTodos(prev => [...prev, res.data.data]);
                else alert(res.data.message);
            }

            // Reset form
            setTitle("");
            setDescription("");
            setStatus("incomplete");
            setEditingId(null);

        } catch (err) {
            console.log(err);
            alert("Something went wrong");
        }
    };

    const handleEdit = todo => {
        setEditingId(todo._id);
        setTitle(todo.title);
        setDescription(todo.description);
        setStatus(todo.Completed ? "completed" : "incomplete"); // ✅ Correctly set status from boolean
    };

    const handleDelete = async id => {
        try {
            await axios.delete(`http://localhost:4000/api/todo/${id}`, { withCredentials: true });
            setTodos(prev => prev.filter(t => t._id !== id));
        } catch (err) { console.log(err); }
    };

    const logout = async () => {
        await axios.post("http://localhost:4000/api/auth/logout", {}, { withCredentials: true });
        navigate("/login");
    };

    const filteredTodos = todos
        .filter(t => t.title.toLowerCase().includes(search.toLowerCase()))
        .filter(t => {
            if (filter === "completed") return t.Completed === true;   // ✅ use boolean
            if (filter === "incomplete") return t.Completed === false; // ✅ use boolean
            return true;
        });

    return (
        <div className="dashboard-wrapper">
            <div className="dashboard-card">
                <div className="top-bar">
                    <h2>Todo Dashboard</h2>
                    <button className="logout-btn" onClick={logout}>Logout</button>
                </div>

                {/* Add / Update Form */}
                <div className="form-row">
                    <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
                    <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
                    <select value={status} onChange={e => setStatus(e.target.value)}>
                        <option value="incomplete">Incomplete</option>
                        <option value="completed">Completed</option>
                    </select>
                    <button className="add-update-btn" onClick={handleAddOrUpdate}>{editingId ? "Update" : "Add"}</button>
                </div>

                {/* Search / Filter */}
                <div className="search-row">
                    <input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
                    <select value={filter} onChange={e => setFilter(e.target.value)}>
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="incomplete">Incomplete</option>
                    </select>
                </div>

                {/* Todo List */}
                <div className="todo-list">
                    {filteredTodos.length === 0 ? <p className="no-todos">No todos found</p> :
                        filteredTodos.map(todo => (
                            <div className="todo-card" key={todo._id}>
                                <div className="todo-content">
                                    <div className="todo-title">{todo.title}</div>
                                    <div className="todo-desc">{todo.description || "No description"}</div>
                                    <div className={`todo-status ${todo.Completed ? "completed" : "incomplete"}`}>
                                        {todo.Completed ? "Completed" : "Incomplete"}
                                    </div>
                                </div>
                                <div className="todo-actions">
                                    <div>
                                        <button className="edit-btn" onClick={() => handleEdit(todo)}>Edit</button>
                                        <button className="delete-btn" onClick={() => handleDelete(todo._id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}