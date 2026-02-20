# MERN Stack Todo App with JWT Authentication

A full-stack **MERN (MongoDB, Express, React, Node.js)** Todo application with **JWT authentication**, allowing users to register, login, and manage their todos securely. Users can create, read, update, and delete todos, filter by status, and search by title.

---

## 🚀 Features

- **User Authentication**  
  - Register and login with JWT-based authentication  
  - Passwords are securely hashed using bcrypt  
  - Only logged-in users can access their todos  

- **Todo Management (CRUD)**  
  - Create new todos with **title**, **description**, and **status** (Completed/Incomplete)  
  - Edit and update existing todos  
  - Delete todos  
  - All operations are user-specific (users can only manage their own todos)  

- **Filter & Search**  
  - Filter todos by **status** (Completed / Incomplete / All)  
  - Search todos by **title**  

- **Frontend**  
  - Built with **React.js**  
  - Responsive and interactive dashboard  
  - Add, edit, and delete todos in real-time  
  - Automatically updates todo list after actions  

- **Backend**  
  - **Node.js + Express**  
  - **MongoDB** for database  
  - JWT middleware for protected routes  
  - RESTful API for todo operations  

- **Bonus Features**  
  - Logout functionality  
  - Loading and error handling  
  - Environment variables managed with `.env`  

---

## 📦 Tech Stack

- **Frontend:** React.js, Axios  
- **Backend:** Node.js, Express.js, JWT, Bcrypt  
- **Database:** MongoDB, Mongoose  
- **Others:** dotenv, CORS  

---

## 📂 Folder Structure
<pre>
Todo/
│
├─ backend/
│  ├─ controllers/
│  │  ├─ authControllers.js
│  │  └─ todoControllers.js
│  ├─ middleware/
│  │  └─ authMiddleware.js
│  ├─ models/
│  │  ├─ authModel.js
│  │  └─ todoModel.js
│  ├─ routes/
│  │  ├─ authRoutes.js
│  │  └─ todoRoutes.js
│  ├─ config/
│  │  └─ db.js
│  ├─ server.js
│  └─ .env
│
├─ frontend/
│  ├─ src/
│  │  ├─ components/
│  │  │  └─ TodoItem/
│  │  ├─ pages/
│  │  │  └─ Dashboard/
│  │  │  └─ Login/
│  │  │  └─ Register/
│  │  └─ App.jsx
│  └─ package.json
└─ README.md
</pre>

## 🖥 Usage
- Register a new account
- Login with your credentials
- Add todos with title, description, and status
- Edit or delete todos
- Filter by Completed / Incomplete
- Search todos by title

## 🎥 video

https://github.com/user-attachments/assets/fe6e2a50-237d-4880-8c57-58dc02873f51

