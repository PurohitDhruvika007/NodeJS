import { Route, Routes } from 'react-router'
import './App.css'
import Signin from './pages/Signin/Signin.jsx'
import Signup from './pages/Signup/Signup'
import VerifyOtp from './pages/VerifyOtp/VerifyOtp'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import ForgetPassword from './pages/ForgetPassword/ForgetPassword'
import VerifyForgetPassword from './pages/VerifyForgetPassword/VerifyForgetPassword'
import Home from './pages/Home/Home.jsx'
import Profile from './pages/Profile/Profile.jsx'
import CheckLogin from './components/CheckLogin.jsx'
import AddEmployees from './pages/AddEmployees/AddEmployees.jsx'
import EditEmployees from './pages/EditEmployees/EditEmployees.jsx'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<CheckLogin><Home /></CheckLogin>} />
        <Route path='/home' element={<CheckLogin><Home /></CheckLogin>} />
        <Route path='/profile' element={<CheckLogin><Profile /></CheckLogin>} />
        <Route path='/add-employees' element={<CheckLogin><AddEmployees /></CheckLogin>} />
        <Route path='/edit-employees' element={<CheckLogin><EditEmployees /></CheckLogin>} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/verify-otp' element={<VerifyOtp />} />
        <Route path='/change-password' element={<ChangePassword />} />
        <Route path='/forget-password' element={<ForgetPassword />} />
        <Route path='/verify-forget-password' element={<VerifyForgetPassword />} />
      </Routes>
    </>
  )
}

export default App
