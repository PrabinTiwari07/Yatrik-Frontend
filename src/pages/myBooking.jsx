

import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaCalendar, FaCar, FaCreditCard, FaKey, FaMapMarkerAlt, FaMoneyBillWave, FaUser } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';

const MyBooking = () => {
    const [selfDriveBookings, setSelfDriveBookings] = useState([]);
    const [driverHireBookings, setDriverHireBookings] = useState([]);
    const [vehicleRentalBookings, setVehicleRentalBookings] = useState([]);
    const [activeTab, setActiveTab] = useState('vehicle-rental'); // 'self-drive', 'driver-hire', or 'vehicle-rental'
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        // Show toast if redirected from a successful booking
        if (location.state?.bookingSuccess) {
            toast.success('Booking confirmed successfully!', {
                position: 'top-right',
            });
        }
    }, [location.state]);

    useEffect(() => {
        const fetchAllBookings = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');

                // Fetch vehicle rental bookings
                const vehicleRentalRes = await axios.get('http://localhost:3000/api/services/user/vehicle-bookings', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setVehicleRentalBookings(vehicleRentalRes.data.bookings || []);

                // Fetch self-drive bookings
                const selfDriveRes = await axios.get('http://localhost:3000/api/selfdrive/my-bookings', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setSelfDriveBookings(selfDriveRes.data.bookings || []);

                // Fetch driver hire bookings
                const driverHireRes = await axios.get('http://localhost:3000/api/driver-hires/my', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setDriverHireBookings(driverHireRes.data.requests || []);

            } catch (error) {
                console.error('Error fetching bookings:', error);
                toast.error('Failed to fetch your bookings.');
            } finally {
                setLoading(false);
            }
        };

        fetchAllBookings();
    }, []);

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'approved':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            case 'cancelled':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-blue-100 text-blue-800';
        }
    };

    // 🚀 NEW: Payment status color
    const getPaymentStatusColor = (paymentStatus) => {
        switch (paymentStatus?.toLowerCase()) {
            case 'paid':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'failed':
                return 'bg-red-100 text-red-800';
            case 'cash':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100">
                <Navbar />
                <div className="max-w-6xl mx-auto p-4">
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="max-w-6xl mx-auto p-4">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">My Bookings</h2>

                {/* Tab Navigation */}
                <div className="bg-white rounded-lg shadow-sm mb-6">
                    <div className="flex border-b">
                        <button
                            onClick={() => setActiveTab('vehicle-rental')}
                            className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${activeTab === 'vehicle-rental'
                                ? 'text-red-600 border-b-2 border-red-600 bg-red-50'
                                : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            <FaKey className="inline mr-2" />
                            Vehicle Rental ({vehicleRentalBookings.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('self-drive')}
                            className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${activeTab === 'self-drive'
                                ? 'text-red-600 border-b-2 border-red-600 bg-red-50'
                                : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            <FaCar className="inline mr-2" />
                            Self Drive ({selfDriveBookings.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('driver-hire')}
                            className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${activeTab === 'driver-hire'
                                ? 'text-red-600 border-b-2 border-red-600 bg-red-50'
                                : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            <FaUser className="inline mr-2" />
                            Driver Hire ({driverHireBookings.length})
                        </button>
                    </div>
                </div>

                {/* Vehicle Rental Bookings */}
                {activeTab === 'vehicle-rental' && (
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-gray-700">Vehicle Rental Bookings</h3>
                        {vehicleRentalBookings.length === 0 ? (
                            <div className="bg-white rounded-lg shadow p-8 text-center">
                                <FaKey className="mx-auto text-gray-400 text-4xl mb-4" />
                                <p className="text-gray-600">No vehicle rental bookings found.</p>
                            </div>
                        ) : (
                            vehicleRentalBookings.map((booking) => (
                                <div
                                    key={booking._id}
                                    className="bg-white rounded-lg shadow-md p-6 mb-6 hover:shadow-lg transition-shadow"
                                >
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <img
                                            src={booking.vehicle?.image || '/assets/car.jpg'}
                                            alt={booking.vehicleName}
                                            className="w-full md:w-48 h-32 object-cover rounded-lg"
                                        />
                                        <div className="flex-1 space-y-3">
                                            <div className="flex justify-between items-start">
                                                <h3 className="text-xl font-semibold text-gray-800">{booking.vehicleName}</h3>
                                                <div className="flex flex-col gap-2">
                                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                                                        {booking.status || 'Pending'}
                                                    </span>
                                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusColor(booking.paymentStatus)}`}>
                                                        💳 {booking.paymentStatus || 'Cash'}
                                                    </span>
                                                    {booking.includeDriver && (
                                                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                                            👨‍💼 With Driver
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <p className="flex items-center text-gray-600">
                                                        <FaCalendar className="mr-2 text-gray-400" />
                                                        <span className="font-medium">Total Days:</span> {booking.totalDays}
                                                    </p>
                                                    <p className="flex items-center text-gray-600">
                                                        <FaMoneyBillWave className="mr-2 text-gray-400" />
                                                        <span className="font-medium">Total Price:</span> Rs. {booking.totalPrice}
                                                    </p>
                                                    <p className="flex items-center text-gray-600">
                                                        <FaCar className="mr-2 text-gray-400" />
                                                        <span className="font-medium">Rental Type:</span> {booking.rentalType || 'self-drive'}
                                                    </p>
                                                </div>
                                                <div className="space-y-2">
                                                    <p className="flex items-center text-gray-600">
                                                        <FaMapMarkerAlt className="mr-2 text-green-500" />
                                                        <span className="font-medium">Pickup:</span> {booking.pickupLocation}
                                                    </p>
                                                    <p className="flex items-center text-gray-600">
                                                        <FaMapMarkerAlt className="mr-2 text-red-500" />
                                                        <span className="font-medium">Dropoff:</span> {booking.dropoffLocation}
                                                    </p>
                                                    <p className="flex items-center text-gray-600">
                                                        <FaCreditCard className="mr-2 text-gray-400" />
                                                        <span className="font-medium">Payment:</span> {booking.paymentMethod}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Payment Details Section for Vehicle Rentals */}
                                            {booking.paymentInfo && booking.paymentStatus === 'paid' && (
                                                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                                                    <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                                                        <FaCreditCard className="mr-2" />
                                                        Payment Details
                                                    </h4>
                                                    <div className="text-xs text-green-700 space-y-1">
                                                        <p><strong>Transaction ID:</strong> {booking.paymentInfo.transactionId}</p>
                                                        <p><strong>Amount:</strong> Rs. {(booking.paymentInfo.amount / 100).toLocaleString()}</p>
                                                        <p><strong>Method:</strong> Khalti</p>
                                                        <p><strong>Paid At:</strong> {new Date(booking.paymentInfo.paidAt).toLocaleString()}</p>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                                <p className="text-sm text-gray-600">
                                                    <span className="font-medium">Pickup:</span> {new Date(booking.pickupTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} on {new Date(booking.pickupDate).toLocaleDateString()}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    <span className="font-medium">Dropoff:</span> {new Date(booking.dropoffTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} on {new Date(booking.dropoffDate).toLocaleDateString()}
                                                </p>
                                            </div>

                                            {booking.notes && (
                                                <div className="pt-2">
                                                    <p className="text-sm text-gray-600">
                                                        <span className="font-medium">Notes:</span> {booking.notes}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* Self Drive Bookings */}
                {activeTab === 'self-drive' && (
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-gray-700">Self Drive Bookings</h3>
                        {selfDriveBookings.length === 0 ? (
                            <div className="bg-white rounded-lg shadow p-8 text-center">
                                <FaCar className="mx-auto text-gray-400 text-4xl mb-4" />
                                <p className="text-gray-600">No self-drive bookings found.</p>
                            </div>
                        ) : (
                            selfDriveBookings.map((booking) => (
                                <div
                                    key={booking._id}
                                    className="bg-white rounded-lg shadow-md p-6 mb-6 hover:shadow-lg transition-shadow"
                                >
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <img
                                            src={`http://localhost:3000/uploads/${booking.vehicle?.image}`}
                                            alt={booking.vehicle?.name}
                                            className="w-full md:w-48 h-32 object-cover rounded-lg"
                                        />
                                        <div className="flex-1 space-y-3">
                                            <div className="flex justify-between items-start">
                                                <h3 className="text-xl font-semibold text-gray-800">{booking.vehicle?.name}</h3>
                                                <div className="flex flex-col gap-2">
                                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.licenseStatus)}`}>
                                                        {booking.licenseStatus || 'Pending'}
                                                    </span>
                                                    {/* 🚀 NEW: Payment Status for Self Drive */}
                                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusColor(booking.paymentStatus || 'cash')}`}>
                                                        💳 {booking.paymentStatus || 'Cash'}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <p className="flex items-center text-gray-600">
                                                        <FaCalendar className="mr-2 text-gray-400" />
                                                        <span className="font-medium">Total Days:</span> {booking.totalDays}
                                                    </p>
                                                    <p className="flex items-center text-gray-600">
                                                        <FaMoneyBillWave className="mr-2 text-gray-400" />
                                                        <span className="font-medium">Total Price:</span> Rs. {booking.totalPrice}
                                                    </p>
                                                </div>
                                                <div className="space-y-2">
                                                    <p className="flex items-center text-gray-600">
                                                        <FaMapMarkerAlt className="mr-2 text-green-500" />
                                                        <span className="font-medium">Pickup:</span> {booking.pickupLocation}
                                                    </p>
                                                    <p className="flex items-center text-gray-600">
                                                        <FaMapMarkerAlt className="mr-2 text-red-500" />
                                                        <span className="font-medium">Dropoff:</span> {booking.dropoffLocation}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                                <p className="text-sm text-gray-600">
                                                    <span className="font-medium">Pickup:</span> {booking.pickupTime} on {new Date(booking.pickupDate).toLocaleDateString()}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    <span className="font-medium">Dropoff:</span> {booking.dropoffTime} on {new Date(booking.dropoffDate).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* Driver Hire Bookings */}
                {activeTab === 'driver-hire' && (
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-gray-700">Driver Hire Bookings</h3>
                        {driverHireBookings.length === 0 ? (
                            <div className="bg-white rounded-lg shadow p-8 text-center">
                                <FaUser className="mx-auto text-gray-400 text-4xl mb-4" />
                                <p className="text-gray-600">No driver hire bookings found.</p>
                            </div>
                        ) : (
                            driverHireBookings.map((booking) => (
                                <div
                                    key={booking._id}
                                    className="bg-white rounded-lg shadow-md p-6 mb-6 hover:shadow-lg transition-shadow"
                                >
                                    <div className="flex flex-col md:flex-row gap-6">
                                        {booking.driver?.image && (
                                            <img
                                                src={`http://localhost:3000${booking.driver.image}`}
                                                alt={booking.driver.name}
                                                className="w-full md:w-48 h-32 object-cover rounded-lg"
                                            />
                                        )}
                                        <div className="flex-1 space-y-3">
                                            <div className="flex justify-between items-start">
                                                <h3 className="text-xl font-semibold text-gray-800">
                                                    Driver: {booking.driver?.name || 'N/A'}
                                                </h3>
                                                <div className="flex flex-col gap-2">
                                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                                                        {booking.status || 'Pending'}
                                                    </span>
                                                    {/* 🚀 NEW: Payment Status */}
                                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusColor(booking.paymentStatus)}`}>
                                                        💳 {booking.paymentStatus || 'Cash'}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <p className="flex items-center text-gray-600">
                                                        <FaCalendar className="mr-2 text-gray-400" />
                                                        <span className="font-medium">Duration:</span> {booking.duration} {booking.duration === 1 ? 'day' : 'days'}
                                                    </p>
                                                    <p className="flex items-center text-gray-600">
                                                        <FaMoneyBillWave className="mr-2 text-gray-400" />
                                                        <span className="font-medium">Total Price:</span> Rs. {booking.totalPrice}
                                                    </p>
                                                    <p className="flex items-center text-gray-600">
                                                        <FaCar className="mr-2 text-gray-400" />
                                                        <span className="font-medium">Vehicle Type:</span> {booking.category}
                                                    </p>
                                                </div>
                                                <div className="space-y-2">
                                                    <p className="flex items-center text-gray-600">
                                                        <FaMapMarkerAlt className="mr-2 text-green-500" />
                                                        <span className="font-medium">From:</span> {booking.pickupLocation}
                                                    </p>
                                                    <p className="flex items-center text-gray-600">
                                                        <FaMapMarkerAlt className="mr-2 text-red-500" />
                                                        <span className="font-medium">To:</span> {booking.dropoffLocation}
                                                    </p>
                                                    {booking.license && (
                                                        <p className="flex items-center text-gray-600">
                                                            <FaUser className="mr-2 text-gray-400" />
                                                            <span className="font-medium">License:</span> {booking.license}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* 🚀 NEW: Payment Details Section */}
                                            {booking.paymentInfo && booking.paymentStatus === 'paid' && (
                                                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                                                    <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                                                        <FaCreditCard className="mr-2" />
                                                        Payment Details
                                                    </h4>
                                                    <div className="text-xs text-green-700 space-y-1">
                                                        <p><strong>Transaction ID:</strong> {booking.paymentInfo.transactionId}</p>
                                                        <p><strong>Amount:</strong> Rs. {(booking.paymentInfo.amount / 100).toLocaleString()}</p>
                                                        <p><strong>Method:</strong> {booking.paymentInfo.paymentMethod}</p>
                                                        <p><strong>Paid At:</strong> {new Date(booking.paymentInfo.paidAt).toLocaleString()}</p>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                                <p className="text-sm text-gray-600">
                                                    <span className="font-medium">Pickup:</span> {booking.pickupTime} on {new Date(booking.pickupDate).toLocaleDateString()}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    <span className="font-medium">Dropoff:</span> {booking.dropoffTime} on {new Date(booking.dropoffDate).toLocaleDateString()}
                                                </p>
                                            </div>

                                            {booking.notes && (
                                                <div className="pt-2">
                                                    <p className="text-sm text-gray-600">
                                                        <span className="font-medium">Notes:</span> {booking.notes}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            {/* Toast Container */}
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

export default MyBooking;