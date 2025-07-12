import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaArrowLeft, FaBriefcase, FaCar, FaDoorClosed, FaGasPump, FaRegClock, FaUser } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

const VehicleList = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                setLoading(true);
                const res = await axios.get('http://localhost:3000/api/vehicles/all');
                setVehicles(res.data);
            } catch (error) {
                console.error('Failed to fetch vehicles:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchVehicles();
    }, []);

    const handleEdit = () => {
        navigate('/self-drive');
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Back Button with improved styling */}
            <div className="max-w-7xl mx-auto px-6 pt-6">
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-gray-700 hover:text-black font-medium transition-colors px-4 py-2 rounded-lg hover:bg-gray-100"
                >
                    <FaArrowLeft className="text-md" />
                    <span>Back </span>
                </button>
            </div>

            <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-8 mt-2">
                {/* Left Sidebar - Enhanced styling */}
                <div className="col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                        <h2 className="text-xl font-semibold text-center mb-6 pb-3 border-b border-gray-100">Your Trip Details</h2>
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-gray-500">From</p>
                                <p className="font-medium">{state?.pickupLocation || 'Not specified'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">To</p>
                                <p className="font-medium">{state?.dropoffLocation || 'Not specified'}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <div>
                                    <p className="text-sm text-gray-500">Pick-up</p>
                                    <p className="font-medium">{state?.pickupDate || 'Not set'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Drop-off</p>
                                    <p className="font-medium">{state?.dropoffDate || 'Not set'}</p>
                                </div>
                            </div>
                            <div className="mt-2 pt-3 border-t border-gray-100">
                                <p className="text-sm text-gray-500">Duration</p>
                                <p className="font-semibold black">{state?.totalDays || 1} day{state?.totalDays > 1 ? 's' : ''}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleEdit}
                            className="mt-6 w-full bg-black text-white py-2.5 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                        >
                            <FaRegClock size={14} />
                            <span>Modify Trip Details</span>
                        </button>
                    </div>
                    {state?.licensePreview && (
                        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center">
                            <h3 className="text-lg font-medium mb-3">License Document</h3>
                            <img
                                src={state.licensePreview}
                                alt="License Preview"
                                className="w-full h-48 object-contain rounded border border-gray-200 bg-gray-50"
                            />
                            <p className="mt-3 text-sm text-gray-600">Your uploaded license document</p>
                        </div>
                    )}
                </div>

                {/* Right Vehicle List - Enhanced styling */}
                <div className="col-span-1 lg:col-span-3">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Available Vehicles</h2>
                        <div className="text-sm text-gray-600">
                            {vehicles.length} {vehicles.length === 1 ? 'car' : 'cars'} found
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-pulse flex flex-col items-center">
                                <div className="rounded-full bg-gray-200 h-12 w-12 mb-4"></div>
                                <div className="text-gray-500">Loading vehicles...</div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {vehicles.map((v) => (
                                <div
                                    key={v._id}
                                    className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow"
                                >
                                    <div className="flex flex-col lg:flex-row justify-between gap-6">
                                        {/* Vehicle Details - Improved layout */}
                                        <div className="flex flex-col md:flex-row gap-6 w-full">
                                            <div className="relative">
                                                <img
                                                    src={`http://localhost:3000/uploads/${v.image}`}
                                                    alt={v.name}
                                                    className="w-full md:w-56 h-40 object-cover rounded-lg shadow"
                                                />
                                                <span
                                                    className={`absolute top-2 left-2 text-xs font-medium px-3 py-1 rounded-full ${v.isBooked ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700'
                                                        }`}
                                                >
                                                    {v.isBooked ? 'Not Available' : 'Available'}
                                                </span>
                                            </div>
                                            <div className="flex-1 space-y-3">
                                                <h3 className="text-xl font-bold">{v.name}</h3>
                                                <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <FaUser className="black-500" />
                                                        <span>{v.seats} Seats</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <FaCar className="black-500" />
                                                        <span>{v.transmission}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <FaBriefcase className="black-500" />
                                                        <span>{v.luggage} Luggage</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <FaGasPump className="black-500" />
                                                        <span>{v.fuel}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <FaDoorClosed className="black-500" />
                                                        <span>{v.doors} Doors</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className={v.airConditioning ? "text-green-500" : "text-red-400"}>
                                                            {v.airConditioning ? '✓ Air Conditioning' : '✗ No AC'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Booking Section - Improved price display */}
                                        <div className="mt-4 lg:mt-0 flex flex-col items-end justify-between">
                                            <div className="text-center lg:text-right mb-4">
                                                <p className="text-sm text-gray-500">Price for {state?.totalDays || 1} day{state?.totalDays > 1 ? 's' : ''}</p>
                                                <p className="text-2xl font-bold black">
                                                    Rs. {state?.totalDays ? (v.price * state.totalDays).toLocaleString() : v.price.toLocaleString()}
                                                </p>
                                                <p className="text-xs text-gray-500">Rs. {v.price.toLocaleString()} per day</p>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    navigate(`/vehicle-details/${v._id}`, {
                                                        state: {
                                                            ...state,
                                                            vehicleId: v._id
                                                        }
                                                    })
                                                }
                                                className={`px-6 py-2.5 rounded-lg font-medium text-white transition-colors
                                                    ${v.isBooked
                                                        ? 'bg-gray-400 cursor-not-allowed'
                                                        : 'bg-black hover:bg-gray-800'}`}
                                                disabled={v.isBooked}
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {vehicles.length === 0 && !loading && (
                                <div className="text-center py-12 bg-white rounded-xl shadow">
                                    <div className="text-gray-500 mb-2">No vehicles available for your search criteria.</div>
                                    <button
                                        onClick={handleEdit}
                                        className="black hover:underline"
                                    >
                                        Try different dates
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VehicleList;