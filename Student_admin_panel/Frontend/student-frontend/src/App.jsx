import './App.css'
import { Routes, Route } from "react-router";

import Signin from './pages/Signin/Signin';
import ForgetPassword from './pages/Forget_password/Forget_password';
import ResetPassword from './pages/Reset_password/Reset_password';
import OtpVerification from './pages/Otp_verification/Otp_verification';
import Front_page from './pages/Front_page/Front_page';

import CheckLogin from './components/CheckLogin.jsx';
import Admin_dashboard from './pages/Admin_dashboard/Admin_dashboard.jsx';
import Student_dashboard from './pages/Student_dashboard/Student_dashboard.jsx';
import Admin_students from './pages/Admin_students/Admin_students.jsx';
import Admin_attendance from './pages/Admin_attendance/Admin_attendance.jsx';
import Admin_grades from './pages/Admin_grades/Admin_grades.jsx';
import Admin_profile from './pages/Admin_profile/Admin_profile.jsx';
import Add_students from './pages/Add_students/Add_students.jsx';
import Edit_students from './pages/Edit_students/Edit_students.jsx';
import Student_profile from './pages/Student_profile/Student_profile.jsx';
import Student_attendance from './pages/Student_attendance/Student_attendance.jsx';
import ChangeAdminPassword from './pages/Change_admin_password/Change_admin_password.jsx';
import ChangeStudentPassword from './pages/Change_student_password/Change_student_password.jsx';
import Student_grade from './pages/Student_grade/Student_grade.jsx';

function App() {

  return (
    <Routes>

      {/* Default Route */}
      <Route path="/" element={<Front_page />} />

      {/* Auth Routes */}
      <Route path="/signin" element={<Signin />} />
      <Route path="/forgot-password" element={<ForgetPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/verify-otp" element={<OtpVerification />} />

      {/* Protected Route */}
      <Route
        path="/admin-dashboard"
        element={
          <CheckLogin>
            <Admin_dashboard />
          </CheckLogin>
        }
      />
      <Route
        path="/student-dashboard"
        element={
          <CheckLogin>
            <Student_dashboard />
          </CheckLogin>
        }
      />

      <Route
        path="/admin-students"
        element={
          <CheckLogin>
            <Admin_students />
          </CheckLogin>
        }
      />

      <Route
        path="/admin-attendance"
        element={
          <CheckLogin>
            <Admin_attendance />
          </CheckLogin>
        }
      />

      <Route
        path="/admin-grades"
        element={
          <CheckLogin>
            <Admin_grades />
          </CheckLogin>
        }
      />

      <Route
        path="/admin-profile"
        element={
          <CheckLogin>
            <Admin_profile />
          </CheckLogin>
        }
      />

      <Route
        path="/student-profile"
        element={
          <CheckLogin>
            <Student_profile />
          </CheckLogin>
        }
      />
      <Route
        path="/student-attendance"
        element={
          <CheckLogin>
            <Student_attendance />
          </CheckLogin>
        }
      />

      <Route
        path="/student-grades"
        element={
          <CheckLogin>
            <Student_grade />
          </CheckLogin>
        }
      />

      <Route
        path="/change-admin-password"
        element={
          <CheckLogin>
            <ChangeAdminPassword />
          </CheckLogin>
        }
      />

      <Route
        path="/change-student-password"
        element={
          <CheckLogin>
            <ChangeStudentPassword />
          </CheckLogin>
        }
      />

      <Route
        path="/admin-students/add-student"
        element={
          <CheckLogin>
            <Add_students />
          </CheckLogin>
        }
      />


      <Route
        path="/admin-students/edit-student"
        element={
          <CheckLogin>
            <Edit_students />
          </CheckLogin>
        }
      />

      {/* 404 Page */}
      <Route
        path="*"
        element={
          <h2 style={{ textAlign: "center", marginTop: "100px" }}>
            Page Not Found
          </h2>
        }
      />

    </Routes>
  )
}

export default App;
