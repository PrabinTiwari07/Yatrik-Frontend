import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaCalendar, FaCar, FaCheckCircle, FaClock, FaCreditCard, FaMapMarkerAlt, FaMoneyBillWave, FaStar, FaStarHalfAlt, FaTimes, FaTimesCircle, FaUserAlt } from 'react-icons/fa';
import { IoIosArrowBack, IoMdArrowDropdown } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/footer';

const Driver = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { tripData } = location.state || {};
    const [drivers, setDrivers] = useState([]);
    const [selectedDriver, setSelectedDriver] = useState(null);
    const [sortOption, setSortOption] = useState('Recommended');
    const [isBooking, setIsBooking] = useState(false);

    useEffect(() => {
        if (!tripData) navigate('/hire-driver');
    }, [tripData, navigate]);

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const token = localStorage.getItem('token');
                // Use the new endpoint that shows all drivers to regular users
                const res = await axios.get('http://localhost:3000/api/drivers/all', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setDrivers(res.data.drivers);
            } catch (error) {
                console.error('Error fetching drivers:', error);
                toast.error('Failed to fetch drivers');
            }
        };
        fetchDrivers();
    }, []);

    const handleBack = () => {
        navigate(-1);
    };

    const handleSelectDriver = (driver) => {
        // Only allow selection of available drivers
        if (!driver.isAvailable) {
            toast.warning('This driver is currently unavailable');
            return;
        }
        setSelectedDriver(driver);
    };

    // Calculate total price based on duration
    const calculateTotalPrice = (dailyPrice, duration) => {
        return dailyPrice * duration;
    };

    const handleBooking = async (paymentMethod = 'cash') => {
        if (!selectedDriver) return toast.error('Please select a driver');

        // Double check if driver is available before booking
        if (!selectedDriver.isAvailable) {
            toast.error('Selected driver is no longer available');
            return;
        }

        if (paymentMethod === 'online') {
            // Redirect to payment page for online payment
            const totalPrice = calculateTotalPrice(selectedDriver.inValleyPrice, tripData.duration);
            const paymentData = {
                tripData,
                selectedDriver,
                totalPrice,
                bookingData: {
                    driver: selectedDriver._id,
                    pickupLocation: tripData.pickup.location,
                    dropoffLocation: tripData.dropoff.location,
                    pickupDate: tripData.pickup.date,
                    dropoffDate: tripData.dropoff.date,
                    pickupTime: tripData.pickup.timeFormatted,
                    dropoffTime: tripData.dropoff.timeFormatted,
                    category: tripData.category,
                    duration: tripData.duration,
                    totalPrice: totalPrice,
                    license: selectedDriver.licenseNumber,
                    paymentMethod: 'online',
                    notes: `${tripData.duration} day(s) driver hire for ${tripData.category} category vehicle - Online Payment`
                }
            };
            navigate('/payment', { state: paymentData });
            return;
        }

        // Handle cash payment booking (existing logic)
        setIsBooking(true);

        try {
            const token = localStorage.getItem('token');
            const totalPrice = calculateTotalPrice(selectedDriver.inValleyPrice, tripData.duration);

            const parseDate = (dateObj) => {
                if (dateObj && dateObj.$d) {
                    return new Date(dateObj.$d);
                } else if (dateObj instanceof Date) {
                    return dateObj;
                } else if (typeof dateObj === 'string') {
                    return new Date(dateObj);
                }
                return new Date();
            };

            const bookingData = {
                driver: selectedDriver._id,
                pickupLocation: tripData.pickup.location,
                dropoffLocation: tripData.dropoff.location,
                pickupDate: parseDate(tripData.pickup.date),
                dropoffDate: parseDate(tripData.dropoff.date),
                pickupTime: tripData.pickup.timeFormatted,
                dropoffTime: tripData.dropoff.timeFormatted,
                category: tripData.category,
                duration: tripData.duration,
                totalPrice: totalPrice,
                license: selectedDriver.licenseNumber,
                paymentMethod: 'cash',
                notes: `${tripData.duration} day(s) driver hire for ${tripData.category} category vehicle - Cash on Delivery`
            };

            const res = await axios.post(
                'http://localhost:3000/api/driver-hires',
                bookingData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            toast.success(`🎉 Driver booked successfully for ${tripData.duration} ${tripData.duration === 1 ? 'day' : 'days'}! Payment on delivery.`, {
                position: "top-right",
                autoClose: 2500,
            });

            setTimeout(() => {
                navigate('/my-bookings');
            }, 3000);

        } catch (error) {
            console.error('Booking error:', error);
            toast.error(error.response?.data?.message || 'Booking failed');
        } finally {
            setIsBooking(false);
        }
    };

    const handleCancel = () => {
        setSelectedDriver(null);
        toast.info('Driver selection cancelled', {
            position: "top-right",
            autoClose: 2000,
        });
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
        // Sort available drivers first, then unavailable
        let sorted = [...list];

        if (sortOption === 'Price: Low to High') {
            sorted = sorted.sort((a, b) => a.inValleyPrice - b.inValleyPrice);
        } else if (sortOption === 'Price: High to Low') {
            sorted = sorted.sort((a, b) => b.inValleyPrice - a.inValleyPrice);
        } else if (sortOption === 'Experience') {
            sorted = sorted.sort((a, b) => b.experience - a.experience);
        }

        // Always show available drivers first
        return sorted.sort((a, b) => {
            if (a.isAvailable && !b.isAvailable) return -1;
            if (!a.isAvailable && b.isAvailable) return 1;
            return 0;
        });
    };

    const sortedDrivers = sortDrivers(drivers);
    const availableCount = drivers.filter(driver => driver.isAvailable).length;

    if (!tripData) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
                <button
                    onClick={handleBack}
                    className="flex items-center text-gray-600 hover:text-black mb-6 transition-colors duration-200 bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md"
                >
                    <IoIosArrowBack className="mr-2" /> Back to Search
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Enhanced Trip Details */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6 border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                <FaCar className="mr-3 text-red-500" />
                                Your Trip
                            </h2>
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mr-4">
                                        <FaMapMarkerAlt className="text-red-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-500 mb-1">From</p>
                                        <p className="font-semibold text-gray-900 mb-2">{tripData.pickup.location}</p>
                                        <div className="space-y-1">
                                            <p className="text-sm text-gray-500 flex items-center">
                                                <FaCalendar className="mr-2 text-gray-400" />
                                                {tripData.pickup.dateFormatted}
                                            </p>
                                            <p className="text-sm text-gray-500 flex items-center">
                                                <FaClock className="mr-2 text-gray-400" />
                                                {tripData.pickup.timeFormatted}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                                        <FaMapMarkerAlt className="text-green-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-500 mb-1">To</p>
                                        <p className="font-semibold text-gray-900 mb-2">{tripData.dropoff.location}</p>
                                        <div className="space-y-1">
                                            <p className="text-sm text-gray-500 flex items-center">
                                                <FaCalendar className="mr-2 text-gray-400" />
                                                {tripData.dropoff.dateFormatted}
                                            </p>
                                            <p className="text-sm text-gray-500 flex items-center">
                                                <FaClock className="mr-2 text-gray-400" />
                                                {tripData.dropoff.timeFormatted}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 pt-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <p className="text-xs text-gray-500 mb-1">Vehicle Type</p>
                                            <p className="text-sm font-medium text-gray-800">{tripData.category}</p>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <p className="text-xs text-gray-500 mb-1">Distance</p>
                                            <p className="text-sm font-medium text-gray-800">{tripData.distance}</p>
                                        </div>
                                    </div>
                                    <div className="mt-3 bg-red-50 p-3 rounded-lg border border-red-200">
                                        <p className="text-xs text-gray-500 mb-1">Duration</p>
                                        <p className="text-lg font-bold text-red-600">
                                            {tripData.duration} {tripData.duration === 1 ? 'day' : 'days'}
                                        </p>
                                    </div>
                                </div>

                                {selectedDriver && (
                                    <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl border border-red-200">
                                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                                            <FaUserAlt className="mr-2 text-red-500" />
                                            Selected Driver
                                        </h3>
                                        <div className="flex items-center mb-4">
                                            <div className="relative">
                                                <img
                                                    src={`http://localhost:3000${selectedDriver.image}`}
                                                    alt={selectedDriver.name}
                                                    className="h-14 w-14 rounded-full object-cover mr-3 border-2 border-white shadow-md"
                                                />
                                                {/* Availability Badge - moved to top-left */}
                                                <div className="absolute -top-1 -left-1">
                                                    <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 text-green-800 rounded-full border-2 border-white">
                                                        <FaCheckCircle className="text-xs" />
                                                    </span>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">{selectedDriver.name}</p>
                                                <div className="flex items-center mb-1">
                                                    {renderStars(selectedDriver.rating || 4.5)}
                                                    <span className="ml-2 text-sm text-gray-600">
                                                        ({selectedDriver.rating || 4.5})
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600">
                                                    {selectedDriver.experience} years experience
                                                </p>
                                            </div>
                                        </div>

                                        {/* Enhanced Pricing Display */}
                                        <div className="bg-white rounded-xl p-4 border border-red-200 shadow-sm">
                                            <h4 className="font-semibold text-gray-800 mb-3">Pricing Breakdown</h4>
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">Daily Rate:</span>
                                                    <span className="font-medium">Rs. {selectedDriver.inValleyPrice}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">Duration:</span>
                                                    <span className="font-medium">{tripData.duration} {tripData.duration === 1 ? 'day' : 'days'}</span>
                                                </div>
                                                <hr className="my-2" />
                                                <div className="flex justify-between items-center">
                                                    <span className="text-lg font-bold text-gray-900">Total Amount:</span>
                                                    <span className="text-xl font-bold text-red-600">
                                                        Rs. {calculateTotalPrice(selectedDriver.inValleyPrice, tripData.duration)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="mt-4 space-y-3">
                                            <button
                                                onClick={() => handleBooking('cash')}
                                                disabled={isBooking || !selectedDriver.isAvailable}
                                                className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${isBooking || !selectedDriver.isAvailable
                                                    ? 'bg-gray-400 cursor-not-allowed'
                                                    : 'bg-green-600 hover:bg-green-700'
                                                    } text-white`}
                                            >
                                                {isBooking ? (
                                                    <>
                                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                        Booking...
                                                    </>
                                                ) : (
                                                    <>
                                                        <FaMoneyBillWave className="mr-2" />
                                                        Book Now (Cash on Delivery)
                                                    </>
                                                )}
                                            </button>

                                            <button
                                                onClick={() => handleBooking('online')}
                                                disabled={isBooking || !selectedDriver.isAvailable}
                                                className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${isBooking || !selectedDriver.isAvailable
                                                    ? 'bg-gray-400 cursor-not-allowed'
                                                    : 'bg-blue-600 hover:bg-blue-700'
                                                    } text-white`}
                                            >
                                                {isBooking ? (
                                                    <>
                                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                        Processing...
                                                    </>
                                                ) : (
                                                    <>
                                                        <FaCreditCard className="mr-2" />
                                                        Pay and Book Now
                                                    </>
                                                )}
                                            </button>

                                            <button
                                                onClick={handleCancel}
                                                disabled={isBooking}
                                                className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${isBooking
                                                    ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                                                    : 'bg-gray-600 hover:bg-gray-700 text-white'
                                                    }`}
                                            >
                                                <FaTimes className="mr-2" />
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Medium-sized Driver List */}
                    <div className="lg:col-span-2">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-800 flex items-center">
                                <FaUserAlt className="mr-2 text-red-500" />
                                All Drivers
                                <span className="ml-2 text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                    {availableCount} of {sortedDrivers.length} available
                                </span>
                            </h2>
                            <div className="relative">
                                <select
                                    value={sortOption}
                                    onChange={(e) => setSortOption(e.target.value)}
                                    className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
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
                                <div
                                    key={driver._id}
                                    className={`bg-white rounded-xl shadow-md overflow-hidden border-2 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${!driver.isAvailable
                                        ? 'opacity-60 border-gray-300 bg-gray-50'
                                        : selectedDriver?._id === driver._id
                                            ? 'border-red-500 ring-2 ring-red-200'
                                            : 'border-gray-200 hover:border-red-300'
                                        }`}
                                >
                                    <div className="p-5">
                                        <div className="flex flex-col md:flex-row items-start md:items-center">
                                            {/* Driver Info */}
                                            <div className="flex items-center mb-4 md:mb-0 md:w-2/5">
                                                <div className="relative">
                                                    <img
                                                        src={`http://localhost:3000${driver.image}`}
                                                        alt={driver.name}
                                                        className="h-16 w-16 rounded-full object-cover mr-4 border-2 border-gray-200 shadow-sm"
                                                    />
                                                    {/* Availability Badge - moved to top-left */}
                                                    <div className="absolute -top-1 -left-2">
                                                        {driver.isAvailable ? (
                                                            <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 text-green-800 rounded-full border-2 border-white shadow-sm">
                                                                <FaCheckCircle className="text-xs" />
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center justify-center w-6 h-6 bg-red-100 text-red-800 rounded-full border-2 border-white shadow-sm">
                                                                <FaTimesCircle className="text-xs" />
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 text-base">{driver.name}</h3>
                                                    <div className="flex items-center mb-1">
                                                        {renderStars(driver.rating || 4.5)}
                                                        <span className="ml-2 text-sm text-gray-600">
                                                            ({driver.rating || 4.5})
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-600 font-medium">
                                                        {driver.experience} years experience
                                                    </p>
                                                    <p className={`text-xs font-medium mt-1 ${driver.isAvailable ? 'text-green-600' : 'text-red-600'
                                                        }`}>
                                                        {driver.isAvailable ? 'Available' : 'Currently Unavailable'}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Driver Details */}
                                            <div className="flex-1 md:px-4 mb-4 md:mb-0">
                                                <div className="space-y-2">
                                                    <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                                                        <FaCar className="mr-3 text-gray-400" />
                                                        <span className="font-medium">License:</span>
                                                        <span className="ml-2">{driver.licenseNumber}</span>
                                                    </div>
                                                    <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                                                        <FaUserAlt className="mr-3 text-gray-400" />
                                                        <span className="font-medium">Languages:</span>
                                                        <span className="ml-2">{driver.language?.join(', ') || 'English, Nepali'}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Pricing and Actions */}
                                            <div className="md:w-1/4 text-center md:text-right">
                                                <div className="mb-4">
                                                    <div className="text-sm text-gray-500 mb-1">Per day</div>
                                                    <div className="text-xl font-bold text-gray-900">Rs. {driver.inValleyPrice}</div>
                                                    <div className={`text-sm font-semibold px-3 py-1 rounded-lg inline-block mt-1 ${driver.isAvailable ? 'text-red-600 bg-red-50' : 'text-gray-500 bg-gray-100'
                                                        }`}>
                                                        Total: Rs. {calculateTotalPrice(driver.inValleyPrice, tripData.duration)}
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleSelectDriver(driver)}
                                                    disabled={!driver.isAvailable}
                                                    className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${!driver.isAvailable
                                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                        : selectedDriver?._id === driver._id
                                                            ? 'bg-green-600 text-white hover:bg-green-700'
                                                            : 'bg-black text-white hover:bg-red-600'
                                                        }`}
                                                >
                                                    {!driver.isAvailable
                                                        ? 'Unavailable'
                                                        : selectedDriver?._id === driver._id
                                                            ? '✓ Selected'
                                                            : 'Select Driver'
                                                    }
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

            {/* Toast Container - Add this at the end */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                style={{ zIndex: 9999 }}
            />
        </div>
    );
};

export default Driver;
