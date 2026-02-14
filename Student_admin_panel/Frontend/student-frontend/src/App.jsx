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
