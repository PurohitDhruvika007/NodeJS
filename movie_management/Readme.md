# 🎬 Movie Manager (MERN Stack)

A full-stack **Movie Management Application** built using **React, Node.js, Express, MongoDB, and Multer**.  
This app allows users to **add, view, update, delete, and search movies** with poster image uploads.

---

## 🚀 Features

### 🎥 Movie Management
- Add new movies with:
  - Title
  - Genre
  - Release Year
  - Description
  - Poster Image
- View all movies in a responsive grid layout
- View detailed movie information
- Update movie details and poster image
- Delete movies (poster image also removed from server)

### 🔍 Search
- Real-time search by movie title


### 🖼 Image Upload
- Image upload using **Multer**
- Image preview before upload
- Images served statically from backend

### ⚡ Smooth Navigation
- Client-side routing using **React Router DOM**
- Navigation without page reloads

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
git clone https://github.com/your-username/movie-manager.git
cd movie-manager

### 2️⃣ Backend Setup
cd backend
npm install
npm start

Server runs at:
http://localhost:4000

Make sure MongoDB is running locally:
mongodb://127.0.0.1:27017/movie

### 3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

Frontend runs at:
http://localhost:5173


---

## 🛠 Tech Stack

### Frontend
- **React (Vite)**
- **React Router DOM**
- **Axios**
- **CSS (custom styling)**

### Backend
- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **Multer**
- **CORS**

---
## 🧠 Key Learnings

- Full CRUD implementation using MERN stack
- File upload handling using Multer
- Serving static files in Express
- React Router DOM navigation
- FormData handling in React
- Component-based UI design
- MongoDB schema design with Mongoose


---

## 📁 Project Structure

<pre>
movie-manager/
│
├── backend/
│ ├── config/
│ │ └── db.js
│ ├── controller/
│ │ └── movie_controller.js
│ ├── middleware/
│ │ ├── logger.js
│ │ └── upload.js
│ ├── models/
│ │ └── movie_model.js
│ ├── routes/
│ │ └── movie_routes.js
│ ├── uploads/
│ ├── server.js
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── AddMovie/
│ │ │ ├── MovieList/
│ │ │ ├── DetailMovie/
│ │ │ ├── UpdateMovie/
│ │ │ └── Navbar/
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── index.css
│
└── README.md
</pre>

## 🎥 vedio