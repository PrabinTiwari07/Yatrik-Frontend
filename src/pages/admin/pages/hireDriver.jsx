import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaCalendarAlt, FaCheck, FaRoute, FaSearch, FaSyncAlt, FaTimes, FaUserCircle, FaUserTie } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Header component with search and filters
const RequestHeader = ({ searchTerm, setSearchTerm, filter, setFilter, fetchHireRequests, loading }) => (
    <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Driver Hire Requests</h1>

        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search requests..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
            </select>

            <button
                onClick={fetchHireRequests}
                className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none"
            >
                <FaSyncAlt className={loading ? "animate-spin" : ""} />
                <span>Refresh</span>
            </button>
        </div>
    </div>
);

// Stats summary component
const StatsSummary = ({ requests }) => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Total Requests</p>
            <p className="text-2xl font-bold">{requests.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">
                {requests.filter(req => req.status === 'pending').length}
            </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Approved</p>
            <p className="text-2xl font-bold text-green-600">
                {requests.filter(req => req.status === 'approved').length}
            </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Rejected</p>
            <p className="text-2xl font-bold text-red-600">
                {requests.filter(req => req.status === 'rejected').length}
            </p>
        </div>
    </div>
);

// Customer info component
const CustomerInfo = ({ user }) => (
    <div className="md:col-span-3">
        <h4 className="font-semibold mb-3 text-gray-700 flex items-center gap-2">
            <FaUserTie className="text-gray-400" /> Customer Details
        </h4>
        <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
                {user?.profileImage ? (
                    <img
                        src={`http://localhost:3000${user.profileImage}`}
                        alt={user?.fullName || "User"}
                        className="w-16 h-16 object-cover rounded-full border border-gray-200"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/default.png";
                        }}
                    />
                ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                        <FaUserCircle size={32} className="text-gray-400" />
                    </div>
                )}
            </div>
            <div className="space-y-2">
                <p><span className="text-gray-500">Name:</span> {user?.fullName || 'N/A'}</p>
                <p><span className="text-gray-500">Email:</span> {user?.email || 'N/A'}</p>
                <p><span className="text-gray-500">Phone:</span> {user?.phone || 'N/A'}</p>
            </div>
        </div>
    </div>
);

// Driver info component
const DriverInfo = ({ driver }) => (
    <div className="md:col-span-3">
        <h4 className="font-semibold mb-3 text-gray-700 flex items-center gap-2">
            <FaUserTie className="text-blue-400" /> Driver Details
        </h4>
        <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
                {driver?.image ? (
                    <img
                        src={`http://localhost:3000${driver.image}`}
                        alt={driver?.name || "Driver"}
                        className="w-16 h-16 object-cover rounded-full border border-gray-200"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/default.png";
                        }}
                    />
                ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                        <FaUserCircle size={32} className="text-gray-400" />
                    </div>
                )}
            </div>
            <div className="space-y-2">
                <p><span className="text-gray-500">Name:</span> {driver?.name || 'Not assigned'}</p>
                <p><span className="text-gray-500">Phone:</span> {driver?.phoneNumber || 'N/A'}</p>
                <p><span className="text-gray-500">License:</span> {driver?.licenseNumber || 'N/A'}</p>
            </div>
        </div>
    </div>
);

// Trip details component
const TripDetails = ({ req }) => (
    <div className="md:col-span-4">
        <h4 className="font-semibold mb-3 text-gray-700 flex items-center gap-2">
            <FaRoute className="text-gray-400" /> Trip Details
        </h4>
        <div className="space-y-2">
            <div className="flex gap-2 items-start">
                <span className="text-gray-500 min-w-[4rem]">From:</span>
                <span>{req.pickupLocation}</span>
            </div>
            <div className="flex gap-2 items-start">
                <span className="text-gray-500 min-w-[4rem]">To:</span>
                <span>{req.dropoffLocation}</span>
            </div>
            <div className="flex gap-2 items-center">
                <FaCalendarAlt className="text-gray-400" />
                <span>
                    {new Date(req.pickupDate).toLocaleDateString()} {req.pickupTime} - {new Date(req.dropoffDate).toLocaleDateString()} {req.dropoffTime}
                </span>
            </div>
        </div>
    </div>
);

// Vehicle details component
const VehicleDetails = ({ category, totalFare }) => (
    <div className="md:col-span-2">
        <h4 className="font-semibold mb-3 text-gray-700">Vehicle Category</h4>
        <div className="space-y-2">
            <p className="text-lg font-medium">{category}</p>
            {totalFare && (
                <p className="text-blue-600 font-medium">Rs. {totalFare}</p>
            )}
        </div>
    </div>
);

// Request card component
const RequestCard = ({ req, updateStatus }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        {/* Request header with ID and status */}
        <div className="flex flex-wrap justify-between items-start mb-4 pb-4 border-b border-gray-100">
            <div>
                <h3 className="text-xl font-semibold">Request #{req._id.slice(-6)}</h3>
                <p className="text-gray-500">Placed on {new Date(req.createdAt).toLocaleString()}</p>
            </div>
            <div>
                <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${req.status === 'approved'
                    ? 'bg-green-100 text-green-700'
                    : req.status === 'rejected'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                    {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                </span>
            </div>
        </div>

        <div className="grid md:grid-cols-12 gap-6">
            <CustomerInfo user={req.user} />
            <DriverInfo driver={req.driver} />
            <TripDetails req={req} />
            <VehicleDetails category={req.category} totalFare={req.totalFare} />
        </div>

        {/* Approval/rejection buttons */}
        {req.status === 'pending' && (
            <div className="mt-6 flex flex-wrap gap-3 justify-end border-t border-gray-100 pt-4">
                <button
                    onClick={() => updateStatus(req._id, 'approved')}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                    <FaCheck /> Approve
                </button>
                <button
                    onClick={() => updateStatus(req._id, 'rejected')}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                    <FaTimes /> Reject
                </button>
            </div>
        )}
    </div>
);

// Main component
const AdminHireDriver = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');

    const fetchHireRequests = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) return toast.error("Admin token missing!");

            const res = await axios.get('http://localhost:3000/api/driver-hires', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setRequests(res.data.requests || []);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to fetch hire requests');
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `http://localhost:3000/api/driver-hires/${id}/status`,
                { status },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success(`Request ${status === 'approved' ? 'approved' : 'rejected'} successfully`);
            fetchHireRequests();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to update status');
        }
    };

    useEffect(() => {
        fetchHireRequests();
    }, []);

    // Filter and search logic
    const filteredRequests = requests.filter(req => {
        // Filter by status
        if (filter !== 'all' && req.status !== filter) return false;

        // Search term
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            return (
                req.user?.fullName?.toLowerCase().includes(searchLower) ||
                req.user?.email?.toLowerCase().includes(searchLower) ||
                req.driver?.name?.toLowerCase().includes(searchLower) ||
                req.pickupLocation?.toLowerCase().includes(searchLower) ||
                req.dropoffLocation?.toLowerCase().includes(searchLower) ||
                req.category?.toLowerCase().includes(searchLower)
            );
        }
        return true;
    });

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-8">
            <ToastContainer position="top-right" autoClose={3000} />

            <RequestHeader
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filter={filter}
                setFilter={setFilter}
                fetchHireRequests={fetchHireRequests}
                loading={loading}
            />

            <StatsSummary requests={requests} />

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
                </div>
            ) : filteredRequests.length === 0 ? (
                <div className="bg-white p-12 rounded-xl shadow-sm text-center">
                    <p className="text-gray-500 text-lg">No hire requests match your filters.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {filteredRequests.map((req) => (
                        <RequestCard
                            key={req._id}
                            req={req}
                            updateStatus={updateStatus}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminHireDriver;
