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

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<CheckLogin><Home /></CheckLogin>} />
        <Route path='/home' element={<CheckLogin><Home /></CheckLogin>} />
        <Route path='/profile' element={<CheckLogin><Profile /></CheckLogin>} />
        <Route path='/add-employees' element={<CheckLogin><AddEmployees /></CheckLogin>} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/verify-otp' element={<CheckLogin><VerifyOtp /></CheckLogin>} />
        <Route path='/change-password' element={<CheckLogin><ChangePassword /></CheckLogin>} />
        <Route path='/forget-password' element={<CheckLogin><ForgetPassword /></CheckLogin>} />
        <Route path='/verify-forget-password' element={<CheckLogin><VerifyForgetPassword /></CheckLogin>} />
      </Routes>
    </>
  )
}

export default App
