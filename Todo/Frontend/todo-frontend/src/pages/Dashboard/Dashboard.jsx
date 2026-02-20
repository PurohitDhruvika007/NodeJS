import { useEffect, useState } from "react";
import axios from "axios";
import TodoItem from "../../components/TodoItem/TodoItem.jsx";
import { useNavigate } from "react-router";

export default function Dashboard() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("incomplete");
    const [editingId, setEditingId] = useState(null);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const navigate = useNavigate();

    // Fetch todos
    const fetchTodos = async () => {
        try {
            const res = await axios.get("http://localhost:4000/api/todo", {
                withCredentials: true,
            });

            if (!res.data.status) {
                navigate("/login");
            } else {
                setTodos(res.data.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    // Add or Update
    const handleAddOrUpdate = async () => {
        if (!title) return alert("Title is required");

        try {
            if (editingId) {
                // Update todo
                const res = await axios.put(
                    `http://localhost:4000/api/todo/${editingId}`,
                    { title, description, completed: status === "completed" },
                    { withCredentials: true }
                );

                if (res.data.status) {
                    // Update state immediately
                    setTodos((prevTodos) =>
                        prevTodos.map((todo) =>
                            todo._id === editingId ? res.data.data : todo
                        )
                    );
                } else {
                    alert(res.data.message);
                }
            } else {
                // Add new todo
                const res = await axios.post(
                    "http://localhost:4000/api/todo",
                    { title, description, completed: status === "completed" },
                    { withCredentials: true }
                );

                if (res.data.status) {
                    setTodos((prevTodos) => [...prevTodos, res.data.data]);
                } else {
                    alert(res.data.message);
                }
            }

            setTitle("");
            setDescription("");
            setStatus("incomplete");
            setEditingId(null);
        } catch (err) {
            console.log(err);
            alert("Something went wrong. Check console.");
        }
    };

    // Edit todo
    const handleEdit = (todo) => {
        setEditingId(todo._id);
        setTitle(todo.title);
        setDescription(todo.description);
        setStatus(todo.Completed ? "completed" : "incomplete");
    };

    // Delete todo
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/api/todo/${id}`, {
                withCredentials: true,
            });
            setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    // Logout
    const logout = async () => {
        await axios.post("http://localhost:4000/api/auth/logout", {}, { withCredentials: true });
        navigate("/login");
    };

    // Filter + search
    const filteredTodos = todos
        .filter((todo) => todo.title.toLowerCase().includes(search.toLowerCase()))
        .filter((todo) => {
            if (filter === "completed") return todo.Completed;
            if (filter === "incomplete") return !todo.Completed;
            return true;
        });

    return (
        <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
            <h2>Todo Dashboard</h2>
            <button onClick={logout} style={{ marginBottom: "20px" }}>Logout</button>

            {/* Add / Update */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                <input
                    style={{ flex: 1 }}
                    placeholder="Enter Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    style={{ flex: 2 }}
                    placeholder="Enter Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="incomplete">Incomplete</option>
                    <option value="completed">Completed</option>
                </select>
                <button onClick={handleAddOrUpdate}>{editingId ? "Update" : "Add"}</button>
            </div>

            {/* Search + Filter */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                <input
                    style={{ flex: 1 }}
                    placeholder="Search by title..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="incomplete">Incomplete</option>
                </select>
            </div>

            {/* Todo list */}
            {filteredTodos.length === 0 ? (
                <p>No todos found</p>
            ) : (
                filteredTodos.map((todo) => (
                    <TodoItem
                        key={todo._id}
                        todo={todo}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                ))
            )}
        </div>
    );
}