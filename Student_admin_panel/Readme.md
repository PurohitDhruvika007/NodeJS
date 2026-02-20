# 🎓 Student Project Management System

A **full-stack student management system** built with **MERN stack** (MongoDB, Express.js, React.js, Node.js) to manage student profiles, grades, attendance, and authentication securely. The system supports **admin and student roles**, password management with **OTP verification**, and a responsive dashboard.

---

## 🔹 Features

### General
- User authentication (Admin & Student)
- OTP-based password reset
- Responsive frontend using **React.js** and **CSS**
- Role-based access control

### Admin Features
- Dashboard with **summary cards** (total students, average grades, attendance)
- View, add, edit, and delete students
- Manage student attendance and grades
- View and update profile
- Change password securely

### Student Features
- Dashboard with **performance graph** (Mid vs Final)
- View personal grades
- View attendance history
- View profile
- Change password securely

### Technical Features
- RESTful API backend built with **Node.js & Express**
- Database: **MongoDB** (for users, students, attendance, grades)
- File upload support (student profile photos)
- Form validation & error handling
- JWT or cookie-based authentication
- Frontend routing with **React Router v6**
- Charts using **Chart.js** for performance visualization

---

## 🔹 Frontend

### Technologies
- React.js
- CSS
- Chart.js
- React Router v6
- Axios for API requests

### Folder Structure
<pre>
  frontend/
├─ public/
├─ src/
│ ├─ components/
│ │ ├─ Admin_navbar/
│ │ ├─ Student_navbar/
│ │ └─ CheckLogin.jsx
│ ├─ pages/
│ │ ├─ Admin_dashboard/
│ │ ├─ Admin_grades/
│ │ ├─ Admin_students/
│ │ ├─ Add_students/
│ │ ├─ Edit_students/
│ │ ├─ Student_dashboard/
│ │ ├─ Student_grade/
│ │ ├─ Student_profile/
│ │ ├─ Student_attendance/
│ │ ├─ Change_admin_password/
│ │ ├─ Change_student_password/
│ │ ├─ Signin/
│ │ ├─ Forget_password/
│ │ ├─ Reset_password/
│ │ ├─ Otp_verification/
│ │ └─ Front_page/
│ ├─ utils/
│ │ └─ global_variable.js
│ ├─ App.jsx
│ └─ index.jsx
└─ package.json
</pre>
---
## 🔹 Backend

### Technologies
- Node.js
- Express.js
- MongoDB (with Mongoose)
- Multer (file upload)
- bcrypt (password hashing)
- cors & cookie-parser

### Folder Structure
<pre>
  backend/
├─ controllers/
│  ├─ authController.js
│  ├─ studentController.js
│  ├─ adminController.js
│  └─ attendanceController.js
├─ models/
│  ├─ userModel.js
│  ├─ studentModel.js
│  ├─ gradeModel.js
│  └─ attendanceModel.js
├─ routes/
│  ├─ authRoutes.js
│  ├─ adminRoutes.js
│  └─ studentRoutes.js
├─ uploads/        # Student profile photos
├─ middleware/
│  └─ authMiddleware.js
├─ config/
│  └─ db.js
├─ server.js
└─ package.json
</pre>

---
## 🔹 Advantages of Student Project Management System

- **Centralized Management:** Manage students, grades, and attendance from a single platform.  
- **Role-Based Access:** Separate dashboards for **Admin** and **Student** for secure access.  
- **Secure Authentication:** OTP-based login and password reset ensures enhanced security.  
- **Performance Tracking:** Graphical visualization of grades with **Chart.js** for better insight.  
- **Responsive Design:** Works on desktop, tablet, and mobile devices.  
- **File Upload Support:** Easy profile photo upload for students.  
- **Fast & Efficient:** Built with **MERN stack**, making it lightweight and scalable.  
- **Easy Maintenance:** Modular code structure allows for easy updates and feature additions.  

---

## 🔹 Technology Stack & Benefits

| Layer | Technology | Advantages |
|-------|------------|------------|
| Frontend | React.js, CSS, Chart.js | Fast UI, responsive, reusable components, interactive charts |
| Backend | Node.js, Express.js | Scalable, lightweight, handles RESTful APIs efficiently |
| Database | MongoDB | Flexible NoSQL DB, ideal for hierarchical student data |
| Auth & Security | JWT, Cookies, OTP | Secure login, password management, session handling |
| File Handling | Multer | Supports profile photo uploads and storage |
| Routing | React Router v6 | Smooth navigation without page reloads |

---

## 🎥video

https://github.com/user-attachments/assets/f77b2784-6b03-4a5b-8eed-6adb3cb26d37

