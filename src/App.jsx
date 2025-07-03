import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './pages/authentication/Login';
import Register from './pages/authentication/Register';
import VerifyOtp from './pages/authentication/verifyOtp'; // adjust path
import Contact from './pages/contact/contact';
import ForgotPassword from './pages/ForgotPassword/forgotPassword';
import ResetPassword from './pages/ForgotPassword/resetPassword';
import VerifyResetOtp from './pages/ForgotPassword/verifyResetOtp';
import HireDriver from './pages/homepage/hireDriver';
import Home from './pages/homepage/home';
import SelfDrive from './pages/homepage/selfDrive';
import LandingPage from './pages/landing'; // ✅ Case-sensitive on some OS like Linux


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        {/* Forgot Password Flow */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-reset-otp" element={<VerifyResetOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/self-drive" element={<SelfDrive />} />
        <Route path="/hire-driver" element={<HireDriver />} />


        {/* Uncomment and add pages when ready */}
        {/* <Route path="/contact" element={<Contact />} /> */}
        {/* <Route path="/self-drive" element={<SelfDrive />} /> */}
        {/* <Route path="/hire-driver" element={<HireDriver />} /> */}
        {/* <Route path="/sign-in" element={<SignIn />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
