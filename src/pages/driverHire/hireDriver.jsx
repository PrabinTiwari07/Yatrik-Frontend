import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { IoMdArrowDropdown, IoMdCar } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../../components/footer';
import MapPicker from '../../components/mapPicker';
import Navbar from '../../components/Navbar';

const CustomTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        borderRadius: '12px',
        backgroundColor: '#f9fafb',
        '& fieldset': {
            borderColor: '#e5e7eb',
        },
        '&:hover fieldset': {
            borderColor: '#9ca3af',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#3b82f6',
        },
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: '#3b82f6',
    },
});

const HireDriver = () => {
    const [pickupLocation, setPickupLocation] = useState('');
    const [dropoffLocation, setDropoffLocation] = useState('');
    const [pickupCoords, setPickupCoords] = useState(null);
    const [dropoffCoords, setDropoffCoords] = useState(null);
    const [pickupDate, setPickupDate] = useState(null);
    const [dropoffDate, setDropoffDate] = useState(null);
    const [pickupTime, setPickupTime] = useState(null);
    const [dropoffTime, setDropoffTime] = useState(null);
    const [category, setCategory] = useState('');
    const [showPickupMap, setShowPickupMap] = useState(false);
    const [showDropoffMap, setShowDropoffMap] = useState(false);

    const vehicleCategories = [
        'Sedan',
        'SUV',
        'Hatchback',
        'Luxury',
        'Van',
        'Mini Truck',
    ];

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!pickupCoords || !pickupLocation.trim()) {
            return toast.error('Please select a valid pickup location.');
        }
        if (!dropoffCoords || !dropoffLocation.trim()) {
            return toast.error('Please select a valid dropoff location.');
        }
        if (!pickupDate || !pickupTime) {
            return toast.error('Please select pickup date & time.');
        }
        if (!dropoffDate || !dropoffTime) {
            return toast.error('Please select dropoff date & time.');
        }
        if (!category.trim()) {
            return toast.error('Please select a vehicle category.');
        }

        // Format dates for display
        const formatDate = (date) => {
            return date ? new Date(date).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            }) : '';
        };

        // Format time for display
        const formatTime = (time) => {
            return time ? new Date(time).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            }) : '';
        };

        // Prepare trip data to pass to the driver page
        const tripData = {
            pickup: {
                location: pickupLocation,
                date: formatDate(pickupDate),
                time: formatTime(pickupTime)
            },
            dropoff: {
                location: dropoffLocation,
                date: formatDate(dropoffDate),
                time: formatTime(dropoffTime)
            },
            category,
            duration: '1 day', // You might want to calculate this based on the dates
            distance: '25 km'  // You might want to calculate this using the coordinates
        };

        // Navigate to driver selection page with trip data
        navigate('/driver', { state: { tripData } });
    };

    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left section */}
                <div className="flex flex-col justify-center">
                    <div className="bg-white p-8 rounded-2xl shadow-lg">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-black rounded-full mb-4">
                                <IoMdCar className="w-10 h-10 text-white" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Hire a Professional Driver</h1>
                            <p className="text-gray-600">
                                Enjoy a stress-free journey with our experienced and verified drivers
                            </p>
                        </div>
                        <div className="space-y-4">
                            {['Experienced & verified drivers', '24/7 customer support', 'Flexible booking options', 'Safe and comfortable ride'].map((feature, index) => (
                                <div key={index} className="flex items-center">
                                    <div className="flex-shrink-0 h-5 w-5 text-green-500">
                                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="ml-3 text-gray-700">{feature}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Form section */}
                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Book Your Driver</h2>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            {/* Pickup Location */}
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">Pick-up Location</label>
                                <div
                                    className="relative"
                                    onClick={() => setShowPickupMap(true)}
                                >
                                    <input
                                        type="text"
                                        value={pickupLocation}
                                        placeholder="Enter pickup location"
                                        readOnly
                                        className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 cursor-pointer bg-gray-50 hover:bg-gray-100 truncate"
                                        style={{ paddingRight: '2.5rem' }}
                                    />
                                    <FaMapMarkerAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                </div>
                                {showPickupMap && (
                                    <MapPicker
                                        onSelect={({ lat, lng, address }) => {
                                            setPickupCoords({ lat, lng });
                                            setPickupLocation(address);
                                            setShowPickupMap(false);
                                        }}
                                        onClose={() => setShowPickupMap(false)}
                                    />
                                )}
                            </div>

                            {/* Dropoff Location */}
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">Drop-off Location</label>
                                <div
                                    className="relative"
                                    onClick={() => setShowDropoffMap(true)}
                                >
                                    <input
                                        type="text"
                                        value={dropoffLocation}
                                        placeholder="Enter drop-off location"
                                        readOnly
                                        className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 cursor-pointer bg-gray-50 hover:bg-gray-100 truncate"
                                        style={{ paddingRight: '2.5rem' }}
                                    />
                                    <FaMapMarkerAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                </div>
                                {showDropoffMap && (
                                    <MapPicker
                                        onSelect={({ lat, lng, address }) => {
                                            setDropoffCoords({ lat, lng });
                                            setDropoffLocation(address);
                                            setShowDropoffMap(false);
                                        }}
                                        onClose={() => setShowDropoffMap(false)}
                                    />
                                )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">Pick-up Date</label>
                                    <div className="relative">
                                        <DatePicker
                                            value={pickupDate}
                                            onChange={setPickupDate}
                                            format="MM, DD, YYYY"
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    fullWidth
                                                    className="bg-gray-50"
                                                    placeholder="Select date"
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">Drop-off Date</label>
                                    <div className="relative">
                                        <DatePicker
                                            value={dropoffDate}
                                            onChange={setDropoffDate}
                                            format="MM, DD, YYYY"
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    fullWidth
                                                    className="bg-gray-50"
                                                    placeholder="Select date"
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">Pick-up Time</label>
                                    <div className="relative">
                                        <TimePicker
                                            value={pickupTime}
                                            onChange={setPickupTime}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    fullWidth
                                                    className="bg-gray-50"
                                                    placeholder="Select time"
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">Drop-off Time</label>
                                    <div className="relative">
                                        <TimePicker
                                            value={dropoffTime}
                                            onChange={setDropoffTime}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    fullWidth
                                                    className="bg-gray-50"
                                                    placeholder="Select time"
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        </LocalizationProvider>

                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Vehicle Category</label>
                            <div className="relative">
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 appearance-none bg-gray-50 hover:bg-gray-100 cursor-pointer"
                                >
                                    <option value="">Select vehicle category</option>
                                    {vehicleCategories.map((cat) => (
                                        <option key={cat} value={cat} className="py-2">
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                                <IoMdCar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <IoMdArrowDropdown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full bg-black text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                                Find Available Drivers
                            </button>
                        </div>
                    </form>
                </div>
            </main>

            <Footer />
            <ToastContainer
                position="top-right"
                autoClose={3000}
                toastStyle={{
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
                progressStyle={{
                    background: 'rgba(246, 78, 59, 0.7)'
                }}
            />
        </div>
    );
};

export default HireDriver;
