import axios from 'axios';
import { useState } from 'react';
import { FiClock, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../components/Navbar';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const validateForm = () => {
    const { name, email, subject, message } = formData;

    if (!name.trim()) {
      toast.error('Please enter your name');
      return false;
    }

    if (!email.trim()) {
      toast.error('Please enter your email');
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return false;
    }

    if (!subject) {
      toast.error('Please select a subject');
      return false;
    }

    if (!message.trim()) {
      toast.error('Please enter your message');
      return false;
    }

    if (message.trim().length < 10) {
      toast.error('Message must be at least 10 characters long');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      await axios.post('http://localhost:3000/api/contact', formData);

      toast.success('Your message has been sent successfully! We will get back to you soon.');

      // Clear form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      // Trigger notification update for any listening components
      window.dispatchEvent(new CustomEvent('notificationUpdate'));

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to send message. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-center mb-10">Contact Us</h2>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Contact Form */}
          <div className="flex flex-col justify-between border rounded-xl p-6 shadow-md bg-white space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Subject</label>
                <div className="relative">
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md text-sm appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    required
                  >
                    <option value="">Select Subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Booking Issue">Booking Issue</option>
                    <option value="Payment">Payment</option>
                    <option value="Customer Support">Customer Support</option>
                    <option value="Other">Other</option>
                  </select>
                  <span className="absolute top-2.5 right-3 text-gray-400 pointer-events-none">⌄</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="Your message (minimum 10 characters)"
                  required
                  minLength="10"
                />
              </div>
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gray-800 text-white px-6 py-2 rounded-md text-sm hover:bg-gray-900 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col justify-between border rounded-xl p-6 shadow-md bg-white w-full max-w-sm mx-auto md:mx-0">
            <div className="space-y-5 text-sm">
              <div className="flex items-start gap-3">
                <FiMail className="mt-1 text-blue-500" />
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p>support@yatrik.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FiPhone className="mt-1 text-green-500" />
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <p>+977 9800000000</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FiMapPin className="mt-1 text-red-500" />
                <div>
                  <h4 className="font-semibold">Address</h4>
                  <p>Putalisadak, Kathmandu, Nepal</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FiClock className="mt-1 text-yellow-500" />
                <div>
                  <h4 className="font-semibold">Support Hours</h4>
                  <p>9AM – 6PM, Sunday to Friday</p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <img
                src="/assets/map.png"
                alt="Map"
                className="w-64 h-auto rounded-md object-contain"
              />
            </div>
          </div>

        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Contact;
