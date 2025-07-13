// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { FaCalendar, FaCar, FaClock, FaCreditCard, FaIdCard, FaMapMarkerAlt, FaMoneyBillWave, FaPhone, FaStar, FaUser } from 'react-icons/fa';
// import { useLocation } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Navbar from '../components/Navbar';

// const MyBooking = () => {
//     const [selfDriveBookings, setSelfDriveBookings] = useState([]);
//     const [driverHireBookings, setDriverHireBookings] = useState([]);
//     const [activeTab, setActiveTab] = useState('driver-hire'); // 🚀 Changed default to driver-hire
//     const [loading, setLoading] = useState(true);
//     const location = useLocation();

//     useEffect(() => {
//         if (location.state?.bookingSuccess) {
//             toast.success('Booking confirmed successfully!', {
//                 position: 'top-right',
//             });
//         }
//     }, [location.state]);

//     useEffect(() => {
//         const fetchAllBookings = async () => {
//             setLoading(true);
//             try {
//                 const token = localStorage.getItem('token');

//                 // Fetch self-drive bookings
//                 const selfDriveRes = await axios.get('http://localhost:3000/api/selfdrive/my-bookings', {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setSelfDriveBookings(selfDriveRes.data.bookings || []);

//                 // Fetch driver hire bookings
//                 const driverHireRes = await axios.get('http://localhost:3000/api/driver-hires/my', {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setDriverHireBookings(driverHireRes.data.requests || []);

//             } catch (error) {
//                 console.error('Error fetching bookings:', error);
//                 toast.error('Failed to fetch your bookings.');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchAllBookings();
//     }, []);

//     const getStatusColor = (status) => {
//         switch (status?.toLowerCase()) {
//             case 'approved':
//                 return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
//             case 'pending':
//                 return 'bg-amber-100 text-amber-800 border border-amber-200';
//             case 'rejected':
//                 return 'bg-rose-100 text-rose-800 border border-rose-200';
//             case 'cancelled':
//                 return 'bg-slate-100 text-slate-800 border border-slate-200';
//             default:
//                 return 'bg-blue-100 text-blue-800 border border-blue-200';
//         }
//     };

//     // 🚀 ENHANCED: Payment status color with better styling
//     const getPaymentStatusColor = (paymentStatus) => {
//         switch (paymentStatus?.toLowerCase()) {
//             case 'paid':
//                 return 'bg-green-100 text-green-800 border border-green-200';
//             case 'pending':
//                 return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
//             case 'failed':
//                 return 'bg-red-100 text-red-800 border border-red-200';
//             case 'online':
//                 return 'bg-blue-100 text-blue-800 border border-blue-200';
//             case 'cash':
//                 return 'bg-orange-100 text-orange-800 border border-orange-200';
//             default:
//                 return 'bg-gray-100 text-gray-800 border border-gray-200';
//         }
//     };

//     // 🚀 NEW: Get payment status text
//     const getPaymentStatusText = (paymentStatus, paymentInfo) => {
//         switch (paymentStatus?.toLowerCase()) {
//             case 'paid':
//                 return paymentInfo?.paymentMethod === 'Khalti' ? 'Paid (Khalti)' : 'Paid Online';
//             case 'pending':
//                 return 'Payment Pending';
//             case 'failed':
//                 return 'Payment Failed';
//             case 'online':
//                 return 'Cash on Delivery';
//             case 'cash':
//                 return 'Cash Payment';
//             default:
//                 return 'Cash';
//         }
//     };

//     if (loading) {
//         return (
//             <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//                 <Navbar />
//                 <div className="max-w-6xl mx-auto p-4">
//                     <div className="flex justify-center items-center h-64">
//                         <div className="relative">
//                             <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-200"></div>
//                             <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-500 border-t-transparent absolute top-0"></div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//             <Navbar />
//             <div className="max-w-7xl mx-auto p-6">
//                 {/* 🚀 ENHANCED: Header with gradient and better spacing */}
//                 <div className="mb-8">
//                     <h2 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent mb-2">
//                         My Bookings
//                     </h2>
//                     <p className="text-gray-600 text-lg">Manage your vehicle and driver bookings</p>
//                 </div>

//                 {/* 🚀 ENHANCED: Tab Navigation with better styling */}
//                 <div className="bg-white rounded-2xl shadow-lg mb-8 overflow-hidden">
//                     <div className="flex border-b border-gray-100">
//                         <button
//                             onClick={() => setActiveTab('self-drive')}
//                             className={`flex-1 py-6 px-8 text-center font-semibold transition-all duration-300 relative ${activeTab === 'self-drive'
//                                 ? 'text-red-600 bg-red-50'
//                                 : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
//                                 }`}
//                         >
//                             {activeTab === 'self-drive' && (
//                                 <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-red-600"></div>
//                             )}
//                             <FaCar className="inline mr-3 text-xl" />
//                             <span className="text-lg">Self Drive</span>
//                             <span className="ml-3 px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">
//                                 {selfDriveBookings.length}
//                             </span>
//                         </button>
//                         <button
//                             onClick={() => setActiveTab('driver-hire')}
//                             className={`flex-1 py-6 px-8 text-center font-semibold transition-all duration-300 relative ${activeTab === 'driver-hire'
//                                 ? 'text-red-600 bg-red-50'
//                                 : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
//                                 }`}
//                         >
//                             {activeTab === 'driver-hire' && (
//                                 <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-red-600"></div>
//                             )}
//                             <FaUser className="inline mr-3 text-xl" />
//                             <span className="text-lg">Driver Hire</span>
//                             <span className="ml-3 px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">
//                                 {driverHireBookings.length}
//                             </span>
//                         </button>
//                     </div>
//                 </div>

//                 {/* Self Drive Bookings */}
//                 {activeTab === 'self-drive' && (
//                     <div>
//                         <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
//                             <FaCar className="mr-3 text-red-500" />
//                             Self Drive Bookings
//                         </h3>
//                         {selfDriveBookings.length === 0 ? (
//                             <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
//                                 <FaCar className="mx-auto text-gray-300 text-6xl mb-6" />
//                                 <h4 className="text-xl font-semibold text-gray-600 mb-2">No Self-Drive Bookings</h4>
//                                 <p className="text-gray-500">You haven't made any self-drive bookings yet.</p>
//                             </div>
//                         ) : (
//                             selfDriveBookings.map((booking) => (
//                                 <div
//                                     key={booking._id}
//                                     className="bg-white rounded-2xl shadow-lg p-8 mb-8 hover:shadow-xl transition-all duration-300 border border-gray-100"
//                                 >
//                                     <div className="flex flex-col lg:flex-row gap-8">
//                                         <div className="relative">
//                                             <img
//                                                 src={`http://localhost:3000/uploads/${booking.vehicle?.image}`}
//                                                 alt={booking.vehicle?.name}
//                                                 className="w-full lg:w-64 h-48 object-cover rounded-xl shadow-md"
//                                             />
//                                             <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
//                                                 <span className="text-sm font-medium text-gray-700">Self Drive</span>
//                                             </div>
//                                         </div>
//                                         <div className="flex-1 space-y-6">
//                                             <div className="flex justify-between items-start">
//                                                 <h3 className="text-2xl font-bold text-gray-800">{booking.vehicle?.name}</h3>
//                                                 <div className="flex flex-col gap-3">
//                                                     <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(booking.licenseStatus)}`}>
//                                                         {booking.licenseStatus || 'Pending'}
//                                                     </span>
//                                                     {/* <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getPaymentStatusColor(booking.paymentStatus || 'online')}`}>
//                                                         💳 {getPaymentStatusText(booking.paymentStatus || 'online', booking.paymentInfo)}
//                                                     </span> */}
//                                                 </div>
//                                             </div>

//                                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                                 <div className="space-y-4">
//                                                     <div className="flex items-center text-gray-700">
//                                                         <FaCalendar className="mr-3 text-red-500" />
//                                                         <span className="font-semibold">Total Days:</span>
//                                                         <span className="ml-2 text-lg font-bold text-red-600">{booking.totalDays}</span>
//                                                     </div>
//                                                     <div className="flex items-center text-gray-700">
//                                                         <FaMoneyBillWave className="mr-3 text-green-500" />
//                                                         <span className="font-semibold">Total Price:</span>
//                                                         <span className="ml-2 text-lg font-bold text-green-600">Rs. {booking.totalPrice?.toLocaleString()}</span>
//                                                     </div>
//                                                 </div>
//                                                 <div className="space-y-4">
//                                                     <div className="flex items-center text-gray-700">
//                                                         <FaMapMarkerAlt className="mr-3 text-green-500" />
//                                                         <span className="font-semibold">Pickup:</span>
//                                                         <span className="ml-2">{booking.pickupLocation}</span>
//                                                     </div>
//                                                     <div className="flex items-center text-gray-700">
//                                                         <FaMapMarkerAlt className="mr-3 text-red-500" />
//                                                         <span className="font-semibold">Dropoff:</span>
//                                                         <span className="ml-2">{booking.dropoffLocation}</span>
//                                                     </div>
//                                                 </div>
//                                             </div>

//                                             <div className="bg-gray-50 rounded-xl p-4">
//                                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                                     <div className="flex items-center text-gray-600">
//                                                         <FaClock className="mr-2 text-blue-500" />
//                                                         <span className="font-medium">Pickup:</span>
//                                                         <span className="ml-2">{booking.pickupTime} on {new Date(booking.pickupDate).toLocaleDateString()}</span>
//                                                     </div>
//                                                     <div className="flex items-center text-gray-600">
//                                                         <FaClock className="mr-2 text-orange-500" />
//                                                         <span className="font-medium">Dropoff:</span>
//                                                         <span className="ml-2">{booking.dropoffTime} on {new Date(booking.dropoffDate).toLocaleDateString()}</span>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))
//                         )}
//                     </div>
//                 )}

//                 {/* Driver Hire Bookings */}
//                 {activeTab === 'driver-hire' && (
//                     <div>
//                         <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
//                             <FaUser className="mr-3 text-red-500" />
//                             Driver Hire Bookings
//                         </h3>
//                         {driverHireBookings.length === 0 ? (
//                             <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
//                                 <FaUser className="mx-auto text-gray-300 text-6xl mb-6" />
//                                 <h4 className="text-xl font-semibold text-gray-600 mb-2">No Driver Hire Bookings</h4>
//                                 <p className="text-gray-500">You haven't hired any drivers yet.</p>
//                             </div>
//                         ) : (
//                             driverHireBookings.map((booking) => (
//                                 <div
//                                     key={booking._id}
//                                     className="bg-white rounded-2xl shadow-lg p-8 mb-8 hover:shadow-xl transition-all duration-300 border border-gray-100"
//                                 >
//                                     <div className="flex flex-col lg:flex-row gap-8">
//                                         <div className="relative">
//                                             {booking.driver?.image ? (
//                                                 <img
//                                                     src={`http://localhost:3000${booking.driver.image}`}
//                                                     alt={booking.driver.name}
//                                                     className="w-full lg:w-64 h-48 object-cover rounded-xl shadow-md"
//                                                 />
//                                             ) : (
//                                                 <div className="w-full lg:w-64 h-48 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl shadow-md flex items-center justify-center">
//                                                     <FaUser className="text-4xl text-gray-500" />
//                                                 </div>
//                                             )}
//                                             <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
//                                                 <span className="text-sm font-medium text-gray-700">Driver Hire</span>
//                                             </div>
//                                             {booking.driver?.rating && (
//                                                 <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center">
//                                                     <FaStar className="text-yellow-500 text-sm mr-1" />
//                                                     <span className="text-sm font-medium">{booking.driver.rating}</span>
//                                                 </div>
//                                             )}
//                                         </div>
//                                         <div className="flex-1 space-y-6">
//                                             <div className="flex justify-between items-start">
//                                                 <div>
//                                                     <h3 className="text-2xl font-bold text-gray-800">
//                                                         {booking.driver?.name || 'Driver Not Assigned'}
//                                                     </h3>
//                                                     {booking.driver?.phone && (
//                                                         <div className="flex items-center mt-2 text-gray-600">
//                                                             <FaPhone className="mr-2 text-blue-500" />
//                                                             <span>{booking.driver.phone}</span>
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                                 <div className="flex flex-col gap-3">
//                                                     <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(booking.status)}`}>
//                                                         {booking.status || 'Pending'}
//                                                     </span>
//                                                     {/* <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getPaymentStatusColor(booking.paymentStatus)}`}>
//                                                         💳 {getPaymentStatusText(booking.paymentStatus, booking.paymentInfo)}
//                                                     </span> */}
//                                                 </div>
//                                             </div>

//                                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                                 <div className="space-y-4">
//                                                     <div className="flex items-center text-gray-700">
//                                                         <FaCalendar className="mr-3 text-red-500" />
//                                                         <span className="font-semibold">Duration:</span>
//                                                         <span className="ml-2 text-lg font-bold text-red-600">
//                                                             {booking.duration} {booking.duration === 1 ? 'day' : 'days'}
//                                                         </span>
//                                                     </div>
//                                                     <div className="flex items-center text-gray-700">
//                                                         <FaMoneyBillWave className="mr-3 text-green-500" />
//                                                         <span className="font-semibold">Total Price:</span>
//                                                         <span className="ml-2 text-lg font-bold text-green-600">Rs. {booking.totalPrice?.toLocaleString()}</span>
//                                                     </div>
//                                                     <div className="flex items-center text-gray-700">
//                                                         <FaCar className="mr-3 text-blue-500" />
//                                                         <span className="font-semibold">Vehicle Type:</span>
//                                                         <span className="ml-2 font-medium">{booking.category}</span>
//                                                     </div>
//                                                 </div>
//                                                 <div className="space-y-4">
//                                                     <div className="flex items-center text-gray-700">
//                                                         <FaMapMarkerAlt className="mr-3 text-green-500" />
//                                                         <span className="font-semibold">From:</span>
//                                                         <span className="ml-2">{booking.pickupLocation}</span>
//                                                     </div>
//                                                     <div className="flex items-center text-gray-700">
//                                                         <FaMapMarkerAlt className="mr-3 text-red-500" />
//                                                         <span className="font-semibold">To:</span>
//                                                         <span className="ml-2">{booking.dropoffLocation}</span>
//                                                     </div>
//                                                     {booking.license && (
//                                                         <div className="flex items-center text-gray-700">
//                                                             <FaIdCard className="mr-3 text-purple-500" />
//                                                             <span className="font-semibold">License:</span>
//                                                             <span className="ml-2 font-mono text-sm">{booking.license}</span>
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                             </div>

//                                             {/* 🚀 ENHANCED: Payment Details Section */}
//                                             {booking.paymentInfo && booking.paymentStatus === 'paid' && (
//                                                 <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
//                                                     <h4 className="font-bold text-green-800 mb-4 flex items-center text-lg">
//                                                         <FaCreditCard className="mr-3 text-xl" />
//                                                         Payment Details
//                                                     </h4>
//                                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-green-700">
//                                                         <div>
//                                                             <p className="font-semibold">Transaction ID:</p>
//                                                             <p className="font-mono text-sm">{booking.paymentInfo.transactionId}</p>
//                                                         </div>
//                                                         <div>
//                                                             <p className="font-semibold">Amount:</p>
//                                                             <p className="text-lg font-bold">Rs. {(booking.paymentInfo.amount / 100).toLocaleString()}</p>
//                                                         </div>
//                                                         <div>
//                                                             <p className="font-semibold">Method:</p>
//                                                             <p className="font-medium">{booking.paymentInfo.paymentMethod}</p>
//                                                         </div>
//                                                         <div>
//                                                             <p className="font-semibold">Paid At:</p>
//                                                             <p className="text-sm">{new Date(booking.paymentInfo.paidAt).toLocaleString()}</p>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             )}

//                                             <div className="bg-gray-50 rounded-xl p-4">
//                                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                                     <div className="flex items-center text-gray-600">
//                                                         <FaClock className="mr-2 text-blue-500" />
//                                                         <span className="font-medium">Pickup:</span>
//                                                         <span className="ml-2">{booking.pickupTime} on {new Date(booking.pickupDate).toLocaleDateString()}</span>
//                                                     </div>
//                                                     <div className="flex items-center text-gray-600">
//                                                         <FaClock className="mr-2 text-orange-500" />
//                                                         <span className="font-medium">Dropoff:</span>
//                                                         <span className="ml-2">{booking.dropoffTime} on {new Date(booking.dropoffDate).toLocaleDateString()}</span>
//                                                     </div>
//                                                 </div>
//                                             </div>

//                                             {booking.notes && (
//                                                 <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
//                                                     <h5 className="font-semibold text-blue-800 mb-2">Notes:</h5>
//                                                     <p className="text-blue-700">{booking.notes}</p>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))
//                         )}
//                     </div>
//                 )}
//             </div>

//             {/* 🚀 ENHANCED: Toast Container */}
//             <ToastContainer
//                 position="top-right"
//                 autoClose={5000}
//                 hideProgressBar={false}
//                 newestOnTop={false}
//                 closeOnClick
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//                 theme="light"
//                 className="mt-16"
//                 toastClassName="rounded-xl shadow-lg"
//             />
//         </div>
//     );
// };

// export default MyBooking;


import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaCalendar, FaCar, FaCreditCard, FaMapMarkerAlt, FaMoneyBillWave, FaUser } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';

const MyBooking = () => {
    const [selfDriveBookings, setSelfDriveBookings] = useState([]);
    const [driverHireBookings, setDriverHireBookings] = useState([]);
    const [activeTab, setActiveTab] = useState('self-drive'); // 'self-drive' or 'driver-hire'
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