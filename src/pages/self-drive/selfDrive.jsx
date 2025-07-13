import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../../components/footer';
import MapPicker from '../../components/mapPicker';
import Navbar from '../../components/Navbar';


const SelfDrive = () => {
    const [pickupLocation, setPickupLocation] = useState('');
    const [dropoffLocation, setDropoffLocation] = useState('');
    const [pickupCoords, setPickupCoords] = useState(null);
    const [dropoffCoords, setDropoffCoords] = useState(null);
    const [pickupDate, setPickupDate] = useState(null);
    const [dropoffDate, setDropoffDate] = useState(null);
    const [pickupTime, setPickupTime] = useState(null);
    const [dropoffTime, setDropoffTime] = useState(null);
    const [license, setLicense] = useState(null);
    const [licensePreview, setLicensePreview] = useState(null);
    const [showPickupMap, setShowPickupMap] = useState(false);
    const [showDropoffMap, setShowDropoffMap] = useState(false);
    const [totalDays, setTotalDays] = useState(0);


    useEffect(() => {
        if (pickupDate && dropoffDate) {
            const start = dayjs(pickupDate);
            const end = dayjs(dropoffDate);
            const days = end.diff(start, 'day');
            setTotalDays(days > 0 ? days : 1);
        }
    }, [pickupDate, dropoffDate]);


    const navigate = useNavigate();

    const handlePickupLocationSelect = (address) => {
        setPickupLocation(address);
        setShowPickupMap(false);
    };

    const handleDropoffLocationSelect = (address) => {
        setDropoffLocation(address);
        setShowDropoffMap(false);
    };

    const handleLicenseUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLicense(file);
            setLicensePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!pickupLocation.trim()) return toast.error('Please select a valid pickup location.');
        if (!dropoffLocation.trim()) return toast.error('Please select a valid dropoff location.');
        if (!pickupDate || !pickupTime) return toast.error('Please select pickup date & time.');
        if (!dropoffDate || !dropoffTime) return toast.error('Please select dropoff date & time.');
        if (!license) return toast.error('Please upload your license.');

        const pickup = dayjs(pickupDate).hour(dayjs(pickupTime).hour()).minute(dayjs(pickupTime).minute());
        const dropoff = dayjs(dropoffDate).hour(dayjs(dropoffTime).hour()).minute(dayjs(dropoffTime).minute());

        if (pickup.isAfter(dropoff)) return toast.error('Drop-off date and time must be after pickup date and time.');
        if (pickup.isBefore(dayjs())) return toast.error('Pickup date and time cannot be in the past.');

        const data = {
            pickupLocation,
            dropoffLocation,
            pickupCoords,
            dropoffCoords,
            pickupDate: pickupDate.toString(),
            dropoffDate: dropoffDate.toString(),
            pickupTime: pickupTime.toString(),
            dropoffTime: dropoffTime.toString(),
            licensePreview,
            totalDays,
        };

        navigate('/vehicle-list', { state: data });
    };

    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Section */}
                <div className="flex flex-col justify-center">
                    <div className="bg-white p-8 rounded-2xl shadow-lg">
                        <img src="/assets/self-drive.png" alt="Self Drive" className="w-36 mx-auto mb-4 drop-shadow-md rounded-lg" />
                        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Self Drive Rentals</h1>
                        <p className="text-gray-600 text-center mb-6">
                            Freedom to drive your own way – anywhere, anytime
                        </p>
                        <div className="space-y-4">
                            {['Flexible pickup & dropoff', 'Verified vehicles', 'Affordable pricing', 'Explore freely'].map((feature, index) => (
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
                        {(pickupDate && dropoffDate) && (
                            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                                <h3 className="font-semibold text-gray-800 mb-2">Trip Duration</h3>
                                <p className="text-lg font-bold text-green-600">{totalDays} day{totalDays > 1 ? 's' : ''}</p>
                                <p className="text-sm text-gray-600">From {dayjs(pickupDate).format('MMM DD')} to {dayjs(dropoffDate).format('MMM DD, YYYY')}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Form Section */}
                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Book a Self-Drive Car</h2>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            {/* Pickup Location */}
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">Pick-up Location</label>
                                <div className="relative" onClick={() => setShowPickupMap(true)}>
                                    <input
                                        type="text"
                                        value={pickupLocation}
                                        placeholder="Enter pickup location"
                                        readOnly
                                        className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 cursor-pointer bg-gray-50 hover:bg-gray-100"
                                    />
                                    <FaMapMarkerAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                                </div>
                            </div>

                            {/* Dropoff Location */}
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">Drop-off Location</label>
                                <div className="relative" onClick={() => setShowDropoffMap(true)}>
                                    <input
                                        type="text"
                                        value={dropoffLocation}
                                        placeholder="Enter drop-off location"
                                        readOnly
                                        className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 cursor-pointer bg-gray-50 hover:bg-gray-100"
                                    />
                                    <FaMapMarkerAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                                </div>
                            </div>

                            {/* Dates & Times */}
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
                                                            borderColor: '#10B981'
                                                        }
                                                    }
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
                                                            borderColor: '#10B981'
                                                        }
                                                    }
                                                }
                                            }
                                        }}
                                    />
                                </div>
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
                                                            borderColor: '#10B981'
                                                        }
                                                    }
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
                                                            borderColor: '#10B981'
                                                        }
                                                    }
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </LocalizationProvider>

                        {/* License Upload */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Upload Driving License</label>
                            <div className="border-2 border-dashed border-gray-400 px-6 py-10 rounded-lg text-center bg-white shadow-md">
                                <input
                                    type="file"
                                    id="license-upload"
                                    className="hidden"
                                    accept="image/*,application/pdf"
                                    onChange={handleLicenseUpload}
                                />
                                <label htmlFor="license-upload" className="cursor-pointer text-gray-600 hover:underline">
                                    {licensePreview ? (
                                        <img src={licensePreview} alt="License" className="h-32 mx-auto object-contain" />
                                    ) : 'Click to upload your license'}
                                </label>
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                            >
                                Continue to Vehicle Selection
                            </button>
                        </div>
                    </form>
                </div>
            </main>

            {showPickupMap && <MapPicker onSelect={handlePickupLocationSelect} onClose={() => setShowPickupMap(false)} />}
            {showDropoffMap && <MapPicker onSelect={handleDropoffLocationSelect} onClose={() => setShowDropoffMap(false)} />}
            <Footer />
            <ToastContainer
                position="top-right"
                autoClose={3000}
                toastStyle={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                progressStyle={{ background: 'rgba(16, 185, 129, 0.7)' }}
            />
        </div>
    );
};

export default SelfDrive;
