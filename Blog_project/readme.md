# 📝 Blog Management System (MERN Stack)

A **full-stack Blog Management System** built using the **MERN Stack** with **OTP authentication**, allowing users to **register, verify their account, login, and manage blogs**. Visitors can read blogs, while authenticated users can **create, edit, and delete their own blogs**.  
The platform features a **modern UI** with image support and a **secure backend**.

---

## 🚀 Features

### 🔐 Authentication & OTP
- User Registration
- OTP Verification for account activation
- Login with email and password
- JWT-based authentication
- Protected routes for blog management
- Author-only blog edit/delete access

---

### 📰 Blog Management
- Create blog with **image upload**
- View all blogs (public)
- Read full blog details
- Edit & Delete blog (only author)
- Live image preview while adding/updating blog

---

### 🎨 Frontend UI
- Responsive and modern UI
- Attractive color palette
- Blog cards layout for home page
- Detailed blog page with author info
- Image preview support for create/update
- No scroll on login page for clean UI
- Mobile-friendly design

---

### ⚙️ Backend API
- RESTful API architecture
- Secure CRUD operations
- OTP-based account verification
- Image upload using Multer
- MongoDB data storage
- JWT authentication
- Password hashing with bcrypt
- Error handling and validation

---

## 🛠 Tech Stack

### **Frontend**
- React.js
- React Router DOM
- Axios
- CSS3 (Custom Styling)
- Responsive Design

### **Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt (Password Hashing)
- Multer (Image Upload)
- dotenv

---

## 📁 Project Structure

<pre>
blog-management-system
│
├── frontend
│ ├── src
│ │ ├── components
│ │ │ ├── Navbar
│ │ │ ├── Footer
│ │ │ ├── BlogCard
│ │ │
│ │ ├── pages
│ │ │ ├── Home
│ │ │ ├── Login
│ │ │ ├── Register
│ │ │ ├── OtpVerification
│ │ │ ├── CreateBlog
│ │ │ ├── EditBlog
│ │ │ ├── BlogDetail
│ │ │
│ │ ├── utils
│ │ │ ├── api.js
│ │ │ ├── auth.js
│ │ │
│ │ └── App.js
│
├── backend
│ ├── models
│ │ ├── User.js
│ │ ├── Blog.js
│ │
│ ├── routes
│ │ ├── authRoutes.js
│ │ ├── blogRoutes.js
│ │
│ ├── controllers
│ │ ├── authController.js
│ │ ├── blogController.js
│ │
│ ├── middleware
│ │ ├── authMiddleware.js
│ │ ├── uploadMiddleware.js
│ │
│ ├── uploads
│ ├── server.js
│ └── .env
│
└── README.md
</pre>
## 🎥 video



https://github.com/user-attachments/assets/4d274e16-a49a-45dc-b1ca-95b3f6f5b1fb

