import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';

const MyBooking = () => {
    const [bookings, setBookings] = useState([]);
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
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem('token'); // Get user token
                const res = await axios.get('http://localhost:3000/api/selfdrive/my-bookings', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setBookings(res.data.bookings);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                toast.error('Failed to fetch your bookings.');
            }
        };

        fetchBookings();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="max-w-6xl mx-auto p-4">
                <h2 className="text-2xl font-bold mb-6">My Self Drive Bookings</h2>

                {bookings.length === 0 ? (
                    <p>No bookings found.</p>
                ) : (
                    bookings.map((b) => (
                        <div
                            key={b._id}
                            className="bg-white rounded-lg shadow p-6 mb-6 flex flex-col md:flex-row gap-6"
                        >
                            <img
                                src={`http://localhost:3000/uploads/${b.vehicle?.image}`}
                                alt={b.vehicle?.name}
                                className="w-48 h-32 object-cover rounded"
                            />
                            <div className="flex-1 space-y-2">
                                <h3 className="text-xl font-semibold">{b.vehicle?.name}</h3>
                                <p><strong>Total Days:</strong> {b.totalDays}</p>
                                <p><strong>Total Price:</strong> Rs. {b.totalPrice}</p>
                                <p><strong>Pickup:</strong> {b.pickupLocation} at {b.pickupTime} on {new Date(b.pickupDate).toLocaleDateString()}</p>
                                <p><strong>Dropoff:</strong> {b.dropoffLocation} at {b.dropoffTime} on {new Date(b.dropoffDate).toLocaleDateString()}</p>
                                <p><strong>Status:</strong> {b.licenseStatus}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyBooking;
