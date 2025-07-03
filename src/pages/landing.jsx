import { FaCalendarAlt, FaCar, FaCarSide, FaCheckCircle, FaHeadset, FaMoneyBillAlt, FaSearch, FaShieldAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import carImage from '../assets/car.png';
import logo from '../assets/logo.jpg';
import mapImage from '../assets/map.png';

const LandingPage = () => {
  return (
    <div className="font-sans text-gray-800">
      <nav className="sticky top-0 z-50 bg-[#971C30] text-white px-6 py-4 mx-4 rounded-full flex justify-between items-center shadow-md">
        <div className="flex items-center gap-2">
          <img src={logo} alt="YatriK Logo" className="h-10 w-10 rounded-full object-cover bg-white p-1" />
        </div>
        <div className="flex gap-6 text-sm font-medium">
          <Link to="/" className="text-white hover:text-gray-300 font-bold">Home</Link>
          <Link to="/contact" className="hover:text-gray-300">Contact</Link>
          <Link to="/self-drive" className="hover:text-gray-300">Self Drive</Link>
          <Link to="/hire-driver" className="hover:text-gray-300">Hire a Driver</Link>
        </div>
        <Link to="/login" className="bg-white text-[#971C30] px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-100">Sign In</Link>
      </nav>

      <section
        className="relative w-full min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${carImage})` }}
      >

        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center px-4">
          <div className="bg-white text-gray-700 rounded-full px-6 py-3 flex items-center w-[90%] md:w-[50%] max-w-xl mb-6">
            <input
              type="text"
              placeholder="Search..."
              className="flex-grow bg-transparent outline-none text-base"
            />
            <FaSearch className="text-[#971C30] text-lg ml-3" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Travel with Ease in Nepal</h1>
          <p className="mb-6 text-sm md:text-base">Book any vehicles, anywhere in Nepal instantly and safely</p>
          <button className="bg-[#971C30] hover:bg-[#7a1727] text-white px-6 py-2 rounded-full font-semibold">See More...</button>
        </div>
      </section>

      <hr className="my-10 border-gray-300" />

      <section className="py-16 px-4 bg-white text-center">
        <div className="max-w-4xl mx-auto">
          <h4 className="inline-block bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">HOW IT WORKS</h4>
          <h2 className="text-2xl md:text-3xl font-semibold mb-10">Rent with following 3 working steps</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="bg-gray-100 p-6 rounded-lg mb-4">
                <FaCheckCircle className="text-3xl text-black" />
              </div>
              <h3 className="font-bold text-lg mb-1">Choose location</h3>
              <p className="text-sm text-gray-600">Choose your area and find your best car</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-gray-100 p-6 rounded-lg mb-4">
                <FaCalendarAlt className="text-3xl text-black" />
              </div>
              <h3 className="font-bold text-lg mb-1">Pick-up date</h3>
              <p className="text-sm text-gray-600">Select your pick-up date and time to book your car</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-gray-100 p-6 rounded-lg mb-4">
                <FaCarSide className="text-3xl text-black" />
              </div>
              <h3 className="font-bold text-lg mb-1">Book your car</h3>
              <p className="text-sm text-gray-600">Book your car and we will deliver it directly to you</p>
            </div>
          </div>
        </div>
      </section>

      <hr className="my-10 border-gray-300" />

      <section className="py-16 px-4 bg-white text-center">
        <div className="max-w-6xl mx-auto">
          <h4 className="inline-block bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold mb-8">
            Popular Vehicles
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { name: 'Hyundai Santa Fe', image: '/assets/vehicles/santa-fe.jpg' },
              { name: 'Johan Liebert', image: '/assets/vehicles/johan.jpg' },
              { name: 'Himiko Toga', image: '/assets/vehicles/toga.jpg' },
              { name: 'KTM Duke 350', image: '/assets/vehicles/ktm.jpg' },
              { name: 'Hikigaya Hachiman', image: '/assets/vehicles/hachiman.jpg' },
              { name: 'Audi SQ7 TFSI', image: '/assets/vehicles/audi.jpg' }
            ].map((vehicle, index) => (
              <div key={index} className="bg-white border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
                <img src={vehicle.image} alt={vehicle.name} className="w-full h-40 object-cover" />
                <h3 className="py-3 text-lg font-medium">{vehicle.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="my-10 border-gray-300" />



      <section className="py-16 px-4 bg-white text-center">
        <div className="max-w-5xl mx-auto">
          <h4 className="inline-block bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">Why Choose Us?</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
            <div className="flex flex-col items-center">
              <FaCar className="text-3xl text-[#971C30] mb-2" />
              <h4 className="font-medium">Wide Selection of Vehicles</h4>
            </div>
            <div className="flex flex-col items-center">
              <FaShieldAlt className="text-3xl text-[#971C30] mb-2" />
              <h4 className="font-medium">Verified Vehicles and drivers</h4>
            </div>
            <div className="flex flex-col items-center">
              <FaMoneyBillAlt className="text-3xl text-[#971C30] mb-2" />
              <h4 className="font-medium">Transparent Pricing</h4>
            </div>
            <div className="flex flex-col items-center">
              <FaHeadset className="text-3xl text-[#971C30] mb-2" />
              <h4 className="font-medium">24/7 Customer Support</h4>
            </div>
          </div>
        </div>
      </section>

      <hr className="my-10 border-gray-300" />

      {/* Explore Region Section */}
      <section className="py-16 px-4 text-center bg-white">
        <div className="max-w-3xl mx-auto">
          <h4 className="inline-block bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold mb-8">
            Explore Nepal
          </h4>

          <div className="relative inline-block">
            <img src={mapImage} alt="Nepal Map" className="w-full max-w-md mx-auto" />
          </div>

          <div className="mt-6 max-w-md mx-auto">
            <div className="bg-white border border-gray-300 rounded-full px-6 py-3 flex items-center">
              <input
                type="text"
                placeholder="Kathmandu"
                className="flex-grow bg-transparent outline-none text-base"
              />
              <FaSearch className="text-[#971C30] text-lg ml-3" />
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-200 text-gray-800 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img src={logo} alt="YatriK Logo" className="h-10 w-10 rounded-full object-cover bg-white p-1" />
              <h3 className="text-xl font-bold">YatriK</h3>
            </div>
            <p className="text-sm">Nepal’s Trusted Vehicle Renting Platform</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-1 text-sm">
              <li>Home</li>
              <li>Vehicles</li>
              <li>Contact</li>
              <li>About</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-2">Support</h4>
            <ul className="space-y-1 text-sm">
              <li>FAQs</li>
              <li>Help Center</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-2">Connect</h4>
            <ul className="space-y-1 text-sm">
              <li>yatrik@gmail.com</li>
              <li>+977 9869028215</li>
            </ul>
            <div className="flex gap-3 mt-3 text-xl">
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 text-center text-sm text-black">
          <span className="inline-block bg-black text-white rounded-full w-6 h-6 leading-6 text-xs">©</span>
          <span className="ml-2">2025 YatriK. All rights reserved.</span>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
