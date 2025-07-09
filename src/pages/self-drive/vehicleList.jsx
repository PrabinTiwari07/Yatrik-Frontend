import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const VehicleList = () => {
    const location = useLocation();
    const tripData = location.state;

    const [vehicles, setVehicles] = useState([]);

    const fetchVehicles = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/vehicles/all');
            setVehicles(Array.isArray(res.data) ? res.data : []);
        } catch {
            toast.error('Failed to fetch vehicles');
        }
    };

    useEffect(() => {
        fetchVehicles();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h2 className="text-3xl font-bold mb-6 text-center">Choose Your Vehicle</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {vehicles.map((v) => (
                    <div key={v._id} className="bg-white shadow-md rounded-xl overflow-hidden relative">
                        {/* Availability badge */}
                        <span className={`absolute top-2 left-2 px-3 py-1 text-xs font-semibold rounded-full ${v.isBooked ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700'}`}>
                            {v.isBooked ? 'Not Available' : 'Available'}
                        </span>

                        <img
                            src={`http://localhost:3000/uploads/${v.image}`}
                            alt={v.name}
                            className="w-full h-48 object-cover"
                        />

                        <div className="p-4 space-y-2">
                            <h3 className="text-xl font-bold">{v.name}</h3>
                            <p><strong>Seats:</strong> {v.seats}</p>
                            <p><strong>Luggage:</strong> {v.luggage}</p>
                            <p><strong>Doors:</strong> {v.doors}</p>
                            <p><strong>Transmission:</strong> {v.transmission}</p>
                            <p><strong>Fuel:</strong> {v.fuel}</p>
                            <p><strong>AC:</strong> {v.airConditioning ? 'Yes' : 'No'}</p>
                            <p><strong>Price:</strong> Rs. {v.price}</p>

                            <button
                                className={`w-full mt-3 py-2 px-4 rounded text-white font-semibold transition ${v.isBooked
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-black hover:bg-gray-800'
                                    }`}
                                disabled={v.isBooked}
                                onClick={() => {
                                    if (!v.isBooked) {
                                        toast.success(`Booked ${v.name} successfully!`);
                                        // You can redirect or handle booking logic here
                                    }
                                }}
                            >
                                {v.isBooked ? 'Unavailable' : 'Book Now'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VehicleList;
