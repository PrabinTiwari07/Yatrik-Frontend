import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
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
            borderColor: '#DC2626',
        },
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: '#DC2626',
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

    // Calculate duration in days
    const calculateDuration = () => {
        if (!pickupDate || !dropoffDate) return 0;

        const pickup = dayjs(pickupDate);
        const dropoff = dayjs(dropoffDate);
        const diffInDays = dropoff.diff(pickup, 'day');

        // Minimum 1 day booking
        return Math.max(1, diffInDays);
    };

    // Get duration for display
    const getDurationDisplay = () => {
        const days = calculateDuration();
        if (days === 0) return 'Select dates';
        if (days === 1) return '1 day';
        return `${days} days`;
    };

    // Fixed pickup location handler
    const handlePickupLocationSelect = (address) => {
        setPickupLocation(address);
        setShowPickupMap(false);
        console.log('Pickup location selected:', address);
    };

    // Fixed dropoff location handler
    const handleDropoffLocationSelect = (address) => {
        setDropoffLocation(address);
        setShowDropoffMap(false);
        console.log('Dropoff location selected:', address);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!pickupLocation.trim()) {
            return toast.error('Please select a valid pickup location.');
        }
        if (!dropoffLocation.trim()) {
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

        // Validate dates
        const pickup = dayjs(pickupDate).hour(dayjs(pickupTime).hour()).minute(dayjs(pickupTime).minute());
        const dropoff = dayjs(dropoffDate).hour(dayjs(dropoffTime).hour()).minute(dayjs(dropoffTime).minute());

        if (pickup.isAfter(dropoff)) {
            return toast.error('Drop-off date and time must be after pickup date and time.');
        }

        if (pickup.isBefore(dayjs())) {
            return toast.error('Pickup date and time cannot be in the past.');
        }

        const duration = calculateDuration();

        // Prepare trip data to pass to the driver page
        const tripData = {
            pickup: {
                location: pickupLocation,
                // Convert dayjs to JavaScript Date object
                date: pickupDate.toDate(), // This converts dayjs to native Date
                time: pickupTime.toDate(), // This converts dayjs to native Date
                dateFormatted: pickup.format('ddd, MMM DD, YYYY'),
                timeFormatted: pickup.format('hh:mm A')
            },
            dropoff: {
                location: dropoffLocation,
                // Convert dayjs to JavaScript Date object
                date: dropoffDate.toDate(), // This converts dayjs to native Date
                time: dropoffTime.toDate(), // This converts dayjs to native Date
                dateFormatted: dropoff.format('ddd, MMM DD, YYYY'),
                timeFormatted: dropoff.format('hh:mm A')
            },
            category,
            duration: duration,
            durationDisplay: getDurationDisplay(),
            distance: '25 km'  // You might want to calculate this using coordinates
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
                                <IoMdCar className="w-10 h-10 text-red-500" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Hire a Professional Driver</h1>
                            <p className="text-gray-600">
                                Enjoy a stress-free journey with our experienced and verified drivers
                            </p>
                        </div>
                        <div className="space-y-4">
                            {['Experienced & verified drivers', '24/7 customer support', 'Flexible booking options', 'Safe and comfortable ride'].map((feature, index) => (
                                <div key={index} className="flex items-center">
                                    <div className="flex-shrink-0 h-5 w-5 text-red-500">
                                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="ml-3 text-gray-700">{feature}</p>
                                </div>
                            ))}
                        </div>

                        {/* Duration Display */}
                        {(pickupDate && dropoffDate) && (
                            <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
                                <h3 className="font-semibold text-gray-800 mb-2">Trip Duration</h3>
                                <p className="text-lg font-bold text-red-600">{getDurationDisplay()}</p>
                                <p className="text-sm text-gray-600">
                                    From {dayjs(pickupDate).format('MMM DD')} to {dayjs(dropoffDate).format('MMM DD, YYYY')}
                                </p>
                            </div>
                        )}
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
                                        className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 cursor-pointer bg-gray-50 hover:bg-gray-100"
                                    />
                                    <FaMapMarkerAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500" />
                                </div>
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
                                        className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 cursor-pointer bg-gray-50 hover:bg-gray-100"
                                    />
                                    <FaMapMarkerAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">Pick-up Date</label>
                                    <DatePicker
                                        value={pickupDate}
                                        onChange={setPickupDate}
                                        format="MM/DD/YYYY"
                                        minDate={dayjs()}
                                        slotProps={{
                                            textField: {
                                                fullWidth: true,
                                                placeholder: "Select date",
                                                sx: {
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: '12px',
                                                        backgroundColor: '#f9fafb',
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: '#DC2626',
                                                        },
                                                    },
                                                }
                                            }
                                        }}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">Drop-off Date</label>
                                    <DatePicker
                                        value={dropoffDate}
                                        onChange={setDropoffDate}
                                        format="MM/DD/YYYY"
                                        minDate={pickupDate || dayjs()}
                                        slotProps={{
                                            textField: {
                                                fullWidth: true,
                                                placeholder: "Select date",
                                                sx: {
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: '12px',
                                                        backgroundColor: '#f9fafb',
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: '#DC2626',
                                                        },
                                                    },
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">Pick-up Time</label>
                                    <TimePicker
                                        value={pickupTime}
                                        onChange={setPickupTime}
                                        slotProps={{
                                            textField: {
                                                fullWidth: true,
                                                placeholder: "Select time",
                                                sx: {
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: '12px',
                                                        backgroundColor: '#f9fafb',
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: '#DC2626',
                                                        },
                                                    },
                                                }
                                            }
                                        }}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">Drop-off Time</label>
                                    <TimePicker
                                        value={dropoffTime}
                                        onChange={setDropoffTime}
                                        slotProps={{
                                            textField: {
                                                fullWidth: true,
                                                placeholder: "Select time",
                                                sx: {
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: '12px',
                                                        backgroundColor: '#f9fafb',
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: '#DC2626',
                                                        },
                                                    },
                                                }
                                            }
                                        }}
                                    />
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
                                className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                                Find Available Drivers
                            </button>
                        </div>
                    </form>
                </div>
            </main>

            {/* MapPicker Modals */}
            {showPickupMap && (
                <MapPicker
                    onSelect={handlePickupLocationSelect}
                    onClose={() => setShowPickupMap(false)}
                />
            )}

            {showDropoffMap && (
                <MapPicker
                    onSelect={handleDropoffLocationSelect}
                    onClose={() => setShowDropoffMap(false)}
                />
            )}

            <Footer />
            <ToastContainer
                position="top-right"
                autoClose={3000}
                toastStyle={{
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
                progressStyle={{
                    background: 'rgba(220, 38, 38, 0.7)'
                }}
            />
        </div>
    );
};

export default HireDriver;
