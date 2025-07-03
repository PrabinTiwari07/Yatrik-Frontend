import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, phone, address, email, password, confirmPassword } = formData;

    if (!fullName || !phone || !address || !email || !password || !confirmPassword) {
      toast.error('All fields are required.', { position: 'top-right' });
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.', { position: 'top-right' });
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || 'Registration failed.', { position: 'top-right' });
        return;
      }

      // toast.success('Registered successfully! Please verify OTP.', {
      //   position: 'top-right',
      // });

      setTimeout(() => {
        navigate('/verify-otp', {
          state: {
            email: formData.email,
            success: 'Registered successfully! Please verify OTP.',
          },
        });
      }, 1500);
    } catch (err) {
      console.error(err);
      toast.error('Server error. Try again later.', { position: 'top-right' });
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100 relative px-4">
      <ToastContainer />

      <div className="w-full max-w-6xl h-[90%] flex rounded-xl overflow-hidden shadow-2xl border-4 border-transparent bg-white">
        <div className="w-1/2 flex flex-col justify-center items-center px-10">
          <h2 className="text-2xl font-bold mb-6">Signup Page</h2>
          <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-3 bg-[#d9d9d9] rounded-md placeholder-black text-black"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone No"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 bg-[#d9d9d9] rounded-md placeholder-black text-black"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 bg-[#d9d9d9] rounded-md placeholder-black text-black"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 bg-[#d9d9d9] rounded-md placeholder-black text-black"
            />

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 bg-[#d9d9d9] rounded-md placeholder-black text-black pr-10"
              />
              <div
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </div>
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 bg-[#d9d9d9] rounded-md placeholder-black text-black pr-10"
              />
              <div
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-900"
            >
              Sign up
            </button>
          </form>

          <p className="text-sm mt-6 font-medium">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-700 font-semibold underline">
              Login here!
            </Link>
          </p>
        </div>

        <div className="w-1/2 h-full">
          <img
            src="/assets/bik.jpg"
            alt="Bike"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
