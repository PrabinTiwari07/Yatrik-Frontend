import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaArrowLeft, FaCar, FaDoorOpen, FaGasPump, FaSnowflake, FaSuitcase, FaUser } from 'react-icons/fa';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../components/Navbar';

const VehicleInfo = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const bookingState = location.state;

    const [vehicle, setVehicle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookingLoading, setBookingLoading] = useState(false);

    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:3000/api/vehicles/${id}`);
                setVehicle(res.data);
            } catch (err) {
                console.error('Error fetching vehicle:', err);
                toast.error('Failed to load vehicle details');
            } finally {
                setLoading(false);
            }
        };
        fetchVehicle();
    }, [id]);

    // Check if user is logged in
    const isUserLoggedIn = () => {
        const token = localStorage.getItem('token');
        return !!token;
    };

    // Handle missing booking state gracefully
    const pickupDate = bookingState?.pickupDate ? new Date(bookingState.pickupDate) : null;
    const dropoffDate = bookingState?.dropoffDate ? new Date(bookingState.dropoffDate) : null;
    const numberOfDays = pickupDate && dropoffDate
        ? Math.ceil((dropoffDate - pickupDate) / (1000 * 60 * 60 * 24))
        : 1;

    const totalPrice = vehicle?.price * numberOfDays || 0;

    // Handle book now (cash on delivery)
    const handleBookNow = async () => {
        if (!isUserLoggedIn()) {
            toast.error('Please login to book this vehicle');
            navigate('/login', { state: { from: location.pathname, bookingState } });
            return;
        }

        if (!bookingState) {
            toast.error('Booking information is missing. Please try again.');
            return;
        }

        try {
            setBookingLoading(true);

            // First create the self-drive request if it doesn't exist yet
            const formData = new FormData();
            formData.append('pickupLocation', bookingState.pickupLocation);
            formData.append('dropoffLocation', bookingState.dropoffLocation);
            formData.append('pickupDate', bookingState.pickupDate);
            formData.append('dropoffDate', bookingState.dropoffDate);
            formData.append('pickupTime', bookingState.pickupTime || '10:00');
            formData.append('dropoffTime', bookingState.dropoffTime || '10:00');

            // If we have license as a file or as base64 string
            if (bookingState.license instanceof File) {
                formData.append('licenseImage', bookingState.license);
            } else if (bookingState.licensePreview) {
                // Convert base64 to File if needed
                const response = await fetch(bookingState.licensePreview);
                const blob = await response.blob();
                const file = new File([blob], 'license.png', { type: 'image/png' });
                formData.append('licenseImage', file);
            }

            const token = localStorage.getItem('token');
            const selfDriveResponse = await axios.post(
                'http://localhost:3000/api/selfdrive',
                formData,
                { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
            );

            // Then confirm the booking with the vehicle
            const selfDriveId = selfDriveResponse.data.request._id;
            const res = await axios.post(
                'http://localhost:3000/api/selfdrive/confirm-booking',  // ✅ matches backend

                {
                    selfDriveId,
                    vehicleId: vehicle._id,
                    isPaid: false // Cash on delivery
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            toast.success('Vehicle booked successfully! (Cash on Delivery)');
            navigate('/my-bookings', {
                state: {
                    success: true,
                    message: 'Your vehicle has been booked successfully. Our team will contact you soon.',
                    bookingDetails: {
                        vehicleName: vehicle.name,
                        pickupDate: bookingState.pickupDate,
                        dropoffDate: bookingState.dropoffDate,
                        totalPrice
                    }
                }
            });
        } catch (error) {
            console.error('Booking error:', error);
            toast.error(error.response?.data?.message || 'Failed to book vehicle');
        } finally {
            setBookingLoading(false);
        }
    };

    // Handle book and pay
    const handleBookAndPay = () => {
        if (!isUserLoggedIn()) {
            toast.error('Please login to book this vehicle');
            navigate('/login', { state: { from: location.pathname, bookingState } });
            return;
        }

        navigate('/payment', {
            state: {
                ...bookingState,
                vehicleId: vehicle._id,
                totalPrice,
                vehicleName: vehicle.name,
            },
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="rounded-full bg-gray-300 h-12 w-12 mb-4"></div>
                    <div className="text-gray-600">Loading vehicle details...</div>
                </div>
            </div>
        );
    }

    if (!vehicle) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
                    <div className="text-red-500 text-xl mb-2">Vehicle not found</div>
                    <p className="text-gray-600 mb-4">The requested vehicle could not be loaded.</p>
                    <button
                        onClick={() => navigate('/self-drive')}
                        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
                    >
                        Return to search
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <ToastContainer position="top-right" autoClose={5000} />
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Back button at top left */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-700 hover:text-black mb-6 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                    <FaArrowLeft /> Back
                </button>

                <h2 className="text-3xl font-bold text-center mb-8">{vehicle.name}</h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Image + Price - Improved layout */}
                    <div className="md:col-span-2">
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <div className="overflow-hidden rounded-lg mb-4">
                                <img
                                    src={`http://localhost:3000/uploads/${vehicle.image}`}
                                    alt={vehicle.name}
                                    className="w-full object-cover rounded-lg transform hover:scale-105 transition-transform duration-300"
                                    style={{ height: "400px" }}
                                />
                            </div>
                            <div className="flex justify-between items-center">
                                <h3 className="text-2xl font-bold">{vehicle.name}</h3>
                                <p className="text-blue-600 font-semibold text-xl">
                                    Rs. {vehicle.price} <span className="text-sm text-gray-500">per day</span>
                                </p>
                            </div>

                            {/* Description */}
                            <div className="bg-gray-50 mt-4 p-4 rounded-xl">
                                <p className="text-gray-700">
                                    {vehicle.name} is a comfortable and easy-to-drive car for all users.
                                    Ideal for trips in and out of the valley.
                                </p>
                            </div>

                            {/* Specifications & Features - Combined into a cleaner layout */}
                            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6">
                                <div className="flex items-center gap-2">
                                    <FaUser className="text-black" size={18} />
                                    <span>{vehicle.seats} Seats</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaCar className="text-black" size={18} />
                                    <span>{vehicle.transmission}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaSuitcase className="text-black" size={18} />
                                    <span>{vehicle.luggage} Luggage</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaGasPump className="text-black" size={18} />
                                    <span>{vehicle.fuel}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaDoorOpen className="text-black" size={18} />
                                    <span>{vehicle.doors} Doors</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaSnowflake className={vehicle.airConditioning ? "text-black" : "text-gray-400"} size={18} />
                                    <span>{vehicle.airConditioning ? 'Air Conditioning' : 'No AC'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Booking Summary - Enhanced styling */}
                    <div className="md:col-span-1">
                        {bookingState ? (
                            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 sticky top-4">
                                <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-100">Booking Summary</h3>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm text-gray-500">From</p>
                                        <p className="font-medium">{bookingState.pickupLocation}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">To</p>
                                        <p className="font-medium">{bookingState.dropoffLocation}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Pick-up Date</p>
                                            <p className="font-medium">{pickupDate?.toDateString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Drop-off Date</p>
                                            <p className="font-medium">{dropoffDate?.toDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="pt-4 mt-4 border-t border-gray-100 flex justify-between">
                                        <p className="font-medium">Duration:</p>
                                        <p className="font-bold">{numberOfDays} day{numberOfDays > 1 ? 's' : ''}</p>
                                    </div>
                                    <div className="pt-2 flex justify-between text-blue-600">
                                        <p className="font-semibold">Total Price:</p>
                                        <p className="text-xl font-bold">Rs. {totalPrice}</p>
                                    </div>

                                    {bookingState.licensePreview && (
                                        <div className="mt-6 pt-4 border-t border-gray-100">
                                            <p className="font-semibold mb-2">Uploaded License:</p>
                                            <img
                                                src={bookingState.licensePreview}
                                                alt="License"
                                                className="w-full h-auto mx-auto rounded-lg border border-gray-200 shadow-sm"
                                            />
                                        </div>
                                    )}

                                    {/* Booking Buttons */}
                                    <div className="mt-6 space-y-3">
                                        <button
                                            onClick={handleBookAndPay}
                                            disabled={bookingLoading}
                                            className="w-full bg-black text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                                        >
                                            {bookingLoading ? 'Processing...' : 'Book and Pay'}
                                        </button>
                                        <button
                                            onClick={handleBookNow}
                                            disabled={bookingLoading}
                                            className="w-full bg-black text-white py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                                        >
                                            <span>{bookingLoading ? 'Processing...' : 'Book Now'}</span>
                                            <span className="text-[08px] text-gray-300">(Cash on Delivery)</span>
                                        </button>

                                        <button
                                            onClick={() => navigate(-2)}
                                            disabled={bookingLoading}
                                            className="w-full bg-red-600 text-white py-2.5 rounded-lg hover:bg-red-700 transition-colors disabled:bg-red-400 disabled:cursor-not-allowed"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                                <div className="text-center text-red-500 font-medium">
                                    <p className="mb-4">Booking data not available.</p>
                                    <p>Please go back and fill the Self Drive form again.</p>
                                </div>
                                <button
                                    onClick={() => navigate('/self-drive')}
                                    className="w-full mt-4 bg-black text-white py-2.5 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                                >
                                    Go to Self Drive
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleInfo;