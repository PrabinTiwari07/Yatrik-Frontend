import { useEffect, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.success) {
      toast.success(location.state.success, { position: 'top-right' });
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error('All fields are required.', { position: 'top-right' });
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || 'Login failed', { position: 'top-right' });
        return;
      }

      localStorage.setItem('token', data.token);
      toast.success('Login successful!', { position: 'top-right' });

      setTimeout(() => {
        window.location.href = '/home';
      }, 1000);
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
          <div className="flex flex-col items-center mb-6">
            <img src="/assets/logo.png" alt="YatriK Logo" className="h-20 mb-2" />
            <h2 className="text-3xl font-bold text-[#a73434]">YatriK</h2>
          </div>

          <h3 className="text-lg font-bold mb-6">Login Page</h3>

          <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5">
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
                onClick={handleTogglePassword}
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </div>
            </div>

            <div className="w-full flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm font-semibold text-black hover:underline cursor-pointer"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-900"
            >
              Sign in
            </button>
          </form>

          <p className="text-sm mt-6 font-medium">
            Don’t have an account?{' '}
            <Link to="/register" className="text-blue-700 font-semibold underline">
              Register here!
            </Link>
          </p>
        </div>

        <div className="w-1/2 h-full">
          <img
            src="/assets/car.jpg"
            alt="Login car"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
