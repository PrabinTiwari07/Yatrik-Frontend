import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error('All fields are required.', { position: 'top-right' });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match.', { position: 'top-right' });
      return;
    }

    if (!email) {
      toast.error('Something went wrong. Email not found in state.', { position: 'top-right' });
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/users/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword, confirmPassword }),
      });

      const contentType = res.headers.get('content-type');
      let data;

      if (contentType && contentType.includes('application/json')) {
        data = await res.json();
      } else {
        data = { message: await res.text() };
      }

      if (!res.ok) throw new Error(data.message);

      // toast.success('Password reset successful!', { position: 'top-right' });
      setTimeout(() => {
        navigate('/login', {
          state: { success: 'Password reset successful! Please log in.' },
        });
      }, 1500);

    } catch (err) {
      toast.error(err.message || 'Something went wrong.', { position: 'top-right' });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <ToastContainer />
      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md text-center">
        <img src="/assets/logo.png" alt="YatriK Logo" className="h-20 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2 text-gray-800">Reset Your Password</h2>
        <p className="text-sm text-gray-600 mb-6">Please enter and confirm your new password</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type={showNew ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="w-full px-4 py-3 border rounded bg-gray-100 focus:outline-none"
            />
            <button
              type="button"
              className="absolute right-3 top-3"
              onClick={() => setShowNew(!showNew)}
              tabIndex={-1}
            >
              {showNew ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <div className="relative">
            <input
              type={showConfirm ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="w-full px-4 py-3 border rounded bg-gray-100 focus:outline-none"
            />
            <button
              type="button"
              className="absolute right-3 top-3"
              onClick={() => setShowConfirm(!showConfirm)}
              tabIndex={-1}
            >
              {showConfirm ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-900"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
