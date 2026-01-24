import { Route, Routes } from 'react-router'
import './App.css'
import Signin from './pages/Signin/Signin.jsx'
import Signup from './pages/Signup/Signup'
import VerifyOtp from './pages/VerifyOtp/VerifyOtp'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import ForgetPassword from './pages/ForgetPassword/ForgetPassword'
import VerifyForgetPassword from './pages/VerifyForgetPassword/VerifyForgetPassword'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Signin />} />
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
