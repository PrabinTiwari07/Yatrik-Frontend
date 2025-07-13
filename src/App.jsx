import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AdminLayout from './pages/admin/adminLayout';
import ProtectedAdminRoute from './pages/admin/pages/protectedAdminRoute';
import Login from './pages/authentication/Login';
import Register from './pages/authentication/Register';
import VerifyOtp from './pages/authentication/verifyOtp';
import Contact from './pages/contact/contact';
import Driver from './pages/driverHire/driver';
import HireDriver from './pages/driverHire/hireDriver';
import ForgotPassword from './pages/ForgotPassword/forgotPassword';
import ResetPassword from './pages/ForgotPassword/resetPassword';
import VerifyResetOtp from './pages/ForgotPassword/verifyResetOtp';
import Help from './pages/help';
import Home from './pages/homepage/home';
import LandingPage from './pages/landing';
import MyBooking from './pages/myBooking';
import Notifications from './pages/notifications';
import Payment from './pages/payment/Payment';
import PaymentSuccess from './pages/payment/PaymentSuccess';
import EditProfile from './pages/profile/editprofile';
import Profile from './pages/profile/profile';
import SelfDrive from './pages/self-drive/selfDrive';
import VehicleInfo from './pages/self-drive/vehicle-info';
import VehicleList from './pages/self-drive/vehicleList';
import Pay from './pages/service/pay';
import PaySuccess from './pages/service/paySuccess';
import Services from './pages/service/Services';
import VehicleRent from './pages/service/vehicleRent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/my-bookings" element={<MyBooking />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/help" element={<Help />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        {/* Forgot Password Flow */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-reset-otp" element={<VerifyResetOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/self-drive" element={<SelfDrive />} />
        <Route path="/vehicle-details/:id" element={<VehicleInfo />} />
        <Route path="/vehicle-rent" element={<VehicleRent />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/pay-success" element={<PaySuccess />} />

        <Route path="/vehicle-list" element={<VehicleList />} />
        <Route path="/hire-driver" element={<HireDriver />} />
        <Route path="/driver" element={<Driver />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />

        {/* <Route path="/admin/*" element={<AdminLayout />} /> */}
        {/* Protected Admin Routes */}
        <Route element={<ProtectedAdminRoute />}>
          <Route path="/admin/*" element={<AdminLayout />} />
        </Route>



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
