import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaCheck, FaSearch, FaSyncAlt, FaTimes, FaTrash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminSelfDrive = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');

    const fetchSelfDriveRequests = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) return toast.error("Admin token missing!");

            const res = await axios.get('http://localhost:3000/api/selfdrive', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setRequests(res.data.requests || []);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to fetch self-drive requests');
        } finally {
            setLoading(false);
        }
    };

    const updateLicenseStatus = async (id, status) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `http://localhost:3000/api/selfdrive/verify/${id}`,
                { status },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success(`Marked as ${status}`);
            fetchSelfDriveRequests();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to update status');
        }
    };

    const deleteBooking = async (id) => {
        if (!window.confirm('Are you sure you want to delete this booking?')) return;
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:3000/api/selfdrive/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Booking deleted');
            fetchSelfDriveRequests();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to delete booking');
        }
    };

    useEffect(() => {
        fetchSelfDriveRequests();
    }, []);

    // Filter and search logic
    const filteredRequests = requests.filter(req => {
        // Filter by status
        if (filter !== 'all' && req.licenseStatus !== filter) return false;

        // Search term
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            return (
                req.user?.fullName?.toLowerCase().includes(searchLower) ||
                req.user?.email?.toLowerCase().includes(searchLower) ||
                req.pickupLocation?.toLowerCase().includes(searchLower) ||
                req.dropoffLocation?.toLowerCase().includes(searchLower) ||
                req.vehicle?.name?.toLowerCase().includes(searchLower)
            );
        }
        return true;
    });

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-8">
            <ToastContainer position="top-right" autoClose={3000} />

            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Self Drive Bookings</h1>

                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                    {/* Search box */}
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search bookings..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Filter dropdown */}
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="verified">Verified</option>
                        <option value="rejected">Rejected</option>
                    </select>

                    {/* Refresh button */}
                    <button
                        onClick={fetchSelfDriveRequests}
                        className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none"
                    >
                        <FaSyncAlt className={loading ? "animate-spin" : ""} />
                        <span>Refresh</span>
                    </button>
                </div>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500 mb-1">Total Bookings</p>
                    <p className="text-2xl font-bold">{requests.length}</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500 mb-1">Pending</p>
                    <p className="text-2xl font-bold text-yellow-600">
                        {requests.filter(req => req.licenseStatus === 'pending').length}
                    </p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500 mb-1">Verified</p>
                    <p className="text-2xl font-bold text-green-600">
                        {requests.filter(req => req.licenseStatus === 'verified').length}
                    </p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500 mb-1">Rejected</p>
                    <p className="text-2xl font-bold text-red-600">
                        {requests.filter(req => req.licenseStatus === 'rejected').length}
                    </p>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
                </div>
            ) : filteredRequests.length === 0 ? (
                <div className="bg-white p-12 rounded-xl shadow-sm text-center">
                    <p className="text-gray-500 text-lg">No bookings match your filters.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {filteredRequests.map((req) => (
                        <div key={req._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="flex flex-wrap justify-between items-start mb-4 pb-4 border-b border-gray-100">
                                <div>
                                    <h3 className="text-xl font-semibold">Booking #{req._id.slice(-6)}</h3>
                                    <p className="text-gray-500">Placed on {new Date(req.createdAt).toLocaleString()}</p>
                                </div>
                                <div>
                                    <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${req.licenseStatus === 'verified'
                                        ? 'bg-green-100 text-green-700'
                                        : req.licenseStatus === 'rejected'
                                            ? 'bg-red-100 text-red-700'
                                            : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {req.licenseStatus.charAt(0).toUpperCase() + req.licenseStatus.slice(1)}
                                    </span>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-12 gap-6">
                                {/* Customer info */}
                                <div className="md:col-span-4">
                                    <h4 className="font-semibold mb-3 text-gray-700">Customer Details</h4>
                                    <div className="space-y-2">
                                        <p><span className="text-gray-500">Name:</span> {req.user?.fullName || 'N/A'}</p>
                                        <p><span className="text-gray-500">Email:</span> {req.user?.email || 'N/A'}</p>
                                        <p><span className="text-gray-500">Phone:</span> {req.user?.phone || 'N/A'}</p>
                                    </div>
                                </div>

                                {/* Trip details */}
                                <div className="md:col-span-4">
                                    <h4 className="font-semibold mb-3 text-gray-700">Trip Details</h4>
                                    <div className="space-y-2">
                                        <p><span className="text-gray-500">From:</span> {req.pickupLocation}</p>
                                        <p><span className="text-gray-500">To:</span> {req.dropoffLocation}</p>
                                        <p>
                                            <span className="text-gray-500">Duration:</span> {req.totalDays || 1} day{req.totalDays !== 1 ? 's' : ''}
                                        </p>
                                        <p>
                                            <span className="text-gray-500">Dates:</span> {new Date(req.pickupDate).toLocaleDateString()} - {new Date(req.dropoffDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>

                                {/* Vehicle & License */}
                                <div className="md:col-span-4">
                                    <div className="mb-4">
                                        <h4 className="font-semibold mb-1 text-gray-700">Vehicle</h4>
                                        <p>{req.vehicle?.name || 'Not assigned'}</p>
                                        {req.totalPrice && <p className="text-blue-600 font-medium">Rs. {req.totalPrice}</p>}
                                    </div>

                                    <h4 className="font-semibold mb-1 text-gray-700">License</h4>
                                    {req.licenseImage ? (
                                        <img
                                            src={`http://localhost:3000/uploads/${req.licenseImage}`}
                                            alt="License"
                                            className="w-full h-32 object-cover rounded-lg border border-gray-200"
                                        />
                                    ) : (
                                        <p className="text-red-500">No license image</p>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6 flex flex-wrap gap-3 justify-end border-t border-gray-100 pt-4">
                                {req.licenseStatus === 'pending' && (
                                    <>
                                        <button
                                            onClick={() => updateLicenseStatus(req._id, 'verified')}
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                                        >
                                            <FaCheck /> Approve
                                        </button>
                                        <button
                                            onClick={() => updateLicenseStatus(req._id, 'rejected')}
                                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                                        >
                                            <FaTimes /> Reject
                                        </button>
                                    </>
                                )}
                                <button
                                    onClick={() => deleteBooking(req._id)}
                                    className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                                >
                                    <FaTrash /> Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminSelfDrive;
