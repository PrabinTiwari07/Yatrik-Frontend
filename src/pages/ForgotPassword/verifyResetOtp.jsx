import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const VerifyResetOtp = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalOtp = otp.join('');
    if (finalOtp.length !== 4) {
      setError('Enter complete OTP');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/users/verify-reset-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: finalOtp }),
      });

      const contentType = res.headers.get('content-type');
      let data;

      if (contentType && contentType.includes('application/json')) {
        data = await res.json();
      } else {
        data = { message: await res.text() };
      }

      if (!res.ok) throw new Error(data.message);

      toast.success('✅ OTP verified! Set a new password.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
      });

      setTimeout(() => {
        navigate('/reset-password', { state: { email } });
      }, 1000);

    } catch (err) {
      toast.error(err.message || 'OTP verification failed', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <ToastContainer />
      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md text-center">
        <img src="/assets/logo.png" alt="YatriK Logo" className="h-20 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2 text-gray-800">Enter OTP</h2>
        <p className="text-sm text-gray-600 mb-6">Check your email for a 4-digit code.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                className="w-12 h-12 text-center text-xl border rounded bg-gray-200 focus:outline-none"
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-40 bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-900 mx-auto block"
          >
            Submit
          </button>
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default VerifyResetOtp;
