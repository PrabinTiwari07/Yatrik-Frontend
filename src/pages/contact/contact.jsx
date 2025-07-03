import { FiClock, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import Navbar from '../../components/Navbar';

const Contact = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-center mb-10">Contact Us</h2>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Contact Form */}
          <div className="flex flex-col justify-between border rounded-xl p-6 shadow-md bg-white space-y-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Subject</label>
                <div className="relative">
                  <select className="w-full px-4 py-2 border rounded-md text-sm appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <option>Select Subject</option>
                    <option>General Inquiry</option>
                    <option>Booking Issue</option>
                    <option>Payment</option>
                    <option>Customer Support</option>
                    <option>Other</option>
                  </select>
                  <span className="absolute top-2.5 right-3 text-gray-400 pointer-events-none">⌄</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea
                  rows="4"
                  className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Your message"
                />
              </div>
            </div>
            <div className="flex justify-center pt-4">
              <button className="bg-black text-white px-6 py-2 rounded-md text-sm hover:bg-gray-800 transition shadow-md">
                Send Message
              </button>
            </div>
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
                  <p>9AM – 6PM, Sunna to Friday</p>
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
    </div>
  );
};

export default Contact;
