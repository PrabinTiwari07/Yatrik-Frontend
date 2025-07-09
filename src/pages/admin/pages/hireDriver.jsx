import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const AdminHireDriver = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchHireRequests = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
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
            toast.success(`Marked as ${status}`);
            fetchHireRequests();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to update status');
        }
    };

    useEffect(() => {
        fetchHireRequests();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 px-6 py-8">
            <h1 className="text-3xl font-semibold text-black mb-6">Driver Hire Requests</h1>
            {loading ? (
                <p className="text-gray-600">Loading requests...</p>
            ) : requests.length === 0 ? (
                <p className="text-gray-600">No requests found.</p>
            ) : (
                <div className="space-y-6">
                    {requests.map((req) => (
                        <div key={req._id} className="bg-white p-6 shadow rounded-lg">
                            <div className="flex justify-between mb-2">
                                <span className="text-sm text-gray-500">Status:</span>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${req.status === 'approved'
                                    ? 'bg-green-100 text-green-700'
                                    : req.status === 'rejected'
                                        ? 'bg-red-100 text-red-700'
                                        : 'bg-yellow-100 text-yellow-700'
                                    }`}>
                                    {req.status}
                                </span>
                            </div>

                            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
                                <div>
                                    <p><strong>User:</strong> {req.user?.fullName || 'N/A'}</p>
                                    <p><strong>Email:</strong> {req.user?.email || 'N/A'}</p>
                                </div>
                                <div>
                                    <p><strong>Driver:</strong> {req.driver?.name || 'N/A'}</p>
                                    <p><strong>Phone:</strong> {req.driver?.phone || 'N/A'}</p>
                                </div>
                                <div>
                                    <p><strong>Pickup:</strong> {req.pickupLocation} on {req.pickupDate?.slice(0, 10)} @ {req.pickupTime}</p>
                                    <p><strong>Dropoff:</strong> {req.dropoffLocation} on {req.dropoffDate?.slice(0, 10)} @ {req.dropoffTime}</p>
                                    <p><strong>Vehicle:</strong> {req.category}</p>
                                </div>
                            </div>

                            {req.status === 'pending' && (
                                <div className="mt-4 flex gap-3">
                                    <button
                                        onClick={() => updateStatus(req._id, 'approved')}
                                        className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => updateStatus(req._id, 'rejected')}
                                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                                    >
                                        Reject
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminHireDriver;
