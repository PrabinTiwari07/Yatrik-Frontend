import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return setError("Email is required");

    try {
      const res = await fetch('http://localhost:3000/api/users/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error sending OTP');

      navigate('/verify-reset-otp', { state: { email } });
    } catch (err) {
      setError(err.message || 'Server error');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md text-center">
        <img src="/assets/logo.png" alt="YatriK" className="h-20 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2 text-gray-800">Forgot Password</h2>
        <p className="mb-6 text-gray-600 text-sm">
          Please submit your email to reset your password
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded bg-gray-200 placeholder-black text-black"
          />
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-48 bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-900"
            >
              Submit
            </button>
          </div>
        </form>

        {error && <p className="text-red-600 mt-4 font-medium">{error}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
