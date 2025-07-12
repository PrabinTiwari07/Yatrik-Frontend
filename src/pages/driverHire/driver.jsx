import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaCar, FaMapMarkerAlt, FaStar, FaStarHalfAlt, FaUserAlt } from 'react-icons/fa';
import { IoIosArrowBack, IoMdArrowDropdown } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../../components/Navbar';
import Footer from '../../components/footer';

const Driver = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { tripData } = location.state || {};
    const [drivers, setDrivers] = useState([]);
    const [selectedDriver, setSelectedDriver] = useState(null);
    const [sortOption, setSortOption] = useState('Recommended');

    useEffect(() => {
        if (!tripData) navigate('/hire-driver');
    }, [tripData, navigate]);

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:3000/api/drivers/available', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setDrivers(res.data.drivers);
            } catch (error) {
                toast.error('Failed to fetch drivers');
            }
        };
        fetchDrivers();
    }, []);

    const handleBack = () => {
        navigate(-1);
    };

    const handleSelectDriver = (driver) => {
        setSelectedDriver(driver);
    };

    const handleBooking = async () => {
        if (!selectedDriver) return toast.error('Please select a driver');

        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(
                'http://localhost:3000/api/driver-hires',
                {
                    driver: selectedDriver._id,
                    pickupLocation: tripData.pickup.location,
                    dropoffLocation: tripData.dropoff.location,
                    pickupDate: new Date(tripData.pickup.date),
                    dropoffDate: new Date(tripData.dropoff.date),
                    pickupTime: tripData.pickup.time,
                    dropoffTime: tripData.dropoff.time,
                    category: tripData.category,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            toast.success('Booking successful!');
            navigate('/my-bookings'); // Redirect to bookings page
        } catch (error) {
            toast.error(error.response?.data?.message || 'Booking failed');
        }
    };


    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        for (let i = 0; i < fullStars; i++) stars.push(<FaStar key={i} className="text-yellow-400" />);
        if (hasHalfStar) stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) stars.push(<FaStar key={`empty-${i}`} className="text-gray-300" />);
        return stars;
    };

    const sortDrivers = (list) => {
        if (sortOption === 'Price: Low to High') {
            return [...list].sort((a, b) => a.inValleyPrice - b.inValleyPrice);
        } else if (sortOption === 'Price: High to Low') {
            return [...list].sort((a, b) => b.inValleyPrice - a.inValleyPrice);
        } else if (sortOption === 'Experience') {
            return [...list].sort((a, b) => b.experience - a.experience);
        }
        return list;
    };

    const sortedDrivers = sortDrivers(drivers);

    if (!tripData) return null;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
                <button onClick={handleBack} className="flex items-center text-gray-600 hover:text-gray-900 mb-6">
                    <IoIosArrowBack className="mr-2" /> Back
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Trip Details */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Trip</h2>
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                                        <FaMapMarkerAlt className="text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">From</p>
                                        <p className="font-medium text-gray-900">{tripData.pickup.location}</p>
                                        <p className="text-sm text-gray-500">{tripData.pickup.date} • {tripData.pickup.time}</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                                        <FaMapMarkerAlt className="text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">To</p>
                                        <p className="font-medium text-gray-900">{tripData.dropoff.location}</p>
                                        <p className="text-sm text-gray-500">{tripData.dropoff.date} • {tripData.dropoff.time}</p>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 pt-4">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-sm text-gray-500">Vehicle Type:</span>
                                        <span className="text-sm font-medium">{tripData.category}</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-sm text-gray-500">Distance:</span>
                                        <span className="text-sm font-medium">{tripData.distance}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-500">Duration:</span>
                                        <span className="text-sm font-medium">{tripData.duration}</span>
                                    </div>
                                </div>

                                {selectedDriver && (
                                    <div className="mt-6 p-4 bg-red-50 rounded-lg">
                                        <h3 className="font-medium text-gray-800 mb-2">Selected Driver</h3>
                                        <div className="flex items-center">
                                            <img src={`http://localhost:3000${selectedDriver.image}`} alt={selectedDriver.name} className="h-12 w-12 rounded-full object-cover mr-3" />
                                            <div>
                                                <p className="font-medium">{selectedDriver.name}</p>
                                                <div className="flex items-center">
                                                    {renderStars(selectedDriver.rating || 4.5)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-3 flex items-center text-sm text-gray-600">
                                            <FaCar className="mr-2 text-gray-500" />
                                            Experience: {selectedDriver.experience} yrs
                                        </div>
                                        <div className="mt-4 flex justify-between items-center">
                                            <span className="text-lg font-bold text-gray-900">Rs. {selectedDriver.inValleyPrice}</span>
                                            <button
                                                onClick={handleBooking}
                                                className="bg-black hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium"
                                            >
                                                Book Now
                                            </button>

                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Driver List */}
                    <div className="lg:col-span-2">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Available Drivers</h2>
                            <div className="relative">
                                <select
                                    value={sortOption}
                                    onChange={(e) => setSortOption(e.target.value)}
                                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-black"
                                >
                                    <option>Recommended</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                    <option>Experience</option>
                                </select>
                                <IoMdArrowDropdown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            {sortedDrivers.map((driver) => (
                                <div key={driver._id} className={`bg-white rounded-xl shadow-sm overflow-hidden border-2 transition-all duration-200 ${selectedDriver?._id === driver._id ? 'border-red-500' : 'border-transparent hover:border-red-200'}`}>
                                    <div className="p-6">
                                        <div className="flex flex-col md:flex-row">
                                            <div className="flex items-start mb-4 md:mb-0 md:w-1/3">
                                                <img src={`http://localhost:3000${driver.image}`} alt={driver.name} className="h-16 w-16 rounded-full object-cover mr-4" />
                                                <div>
                                                    <h3 className="font-medium text-gray-900">{driver.name}</h3>
                                                    <div className="flex items-center">
                                                        {renderStars(driver.rating || 4.5)}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex-1 md:px-4">
                                                <div className="flex items-center text-sm text-gray-600 mb-2">
                                                    <FaCar className="mr-2 text-gray-400" />
                                                    License: {driver.licenseNumber}
                                                </div>
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <FaUserAlt className="mr-2 text-gray-400" />
                                                    Speaks: {driver.language?.join(', ') || 'English, Nepali'}
                                                </div>
                                            </div>

                                            <div className="mt-4 md:mt-0 flex flex-col items-end">
                                                <div className="text-2xl font-bold text-gray-900">Rs. {driver.inValleyPrice}</div>
                                                <div className="text-sm text-gray-500 mb-3">In Valley Price</div>
                                                <button
                                                    onClick={() => handleSelectDriver(driver)}
                                                    className={`px-4 py-2 rounded-lg font-medium ${selectedDriver?._id === driver._id ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-black text-white hover:bg-red-700'}`}
                                                >
                                                    {selectedDriver?._id === driver._id ? 'Selected' : 'Select'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Driver;
