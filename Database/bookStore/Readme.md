# 📚 Bookstore REST API (Node.js + Express + MongoDB)

A simple and powerful **Bookstore REST API** built using **Node.js**, **Express**, and **MongoDB (Mongoose)**.  
This project demonstrates clean project structure, CRUD operations, middleware usage, and database connectivity following best practices.

---

## 🚀 Features

- 📦 Create, Read, Update, and Delete (CRUD) books
- 🔗 RESTful API architecture
- 🛡️ Middleware-based request logging
- 🗄️ MongoDB integration using Mongoose
- ⚡ Asynchronous operations with async/await
- 📁 Clean and modular folder structure
- 🧪 Easy to test with Postman or Thunder Client

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **ODM:** Mongoose  
- **Tools:** Postman / Thunder Client  
- **Language:** JavaScript (ES Modules)

---

## 📂 Project Structure

<pre>
bookstore-api/
│
├── config/
│ └── db.js # MongoDB connection logic
│
├── controllers/
│ └── bookControllers.js # CRUD operations
│
├── middleware/
│ └── logger.js # Custom logger middleware
│
├── models/
│ └── bookModel.js # Mongoose schema & model
│
├── routes/
│ └── bookRoutes.js # API routes
│
├── server.js # App entry point
│
├── package.json
└── README.md
</pre>


---

## 🔗 API Endpoints

| Method | Endpoint   | Description         |
| ------ | ---------- | ------------------- |
| GET    | `/api`     | Get all books       |
| POST   | `/api`     | Add a new book      |
| PUT    | `/api/:id` | Update a book by ID |
| DELETE | `/api/:id` | Delete a book by ID |

---

## 🎥 video




