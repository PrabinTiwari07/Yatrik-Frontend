import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../../components/footer';
import MapPicker from '../../components/mapPicker';
import Navbar from '../../components/Navbar';

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

        toast.success('Form submitted successfully!');
        console.log({
            pickupLocation,
            pickupCoords,
            dropoffLocation,
            dropoffCoords,
            pickupDate,
            pickupTime,
            dropoffDate,
            dropoffTime,
            category,
        });
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow max-w-6xl mx-auto py-12 px-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Left section */}
                <div className="flex flex-col">
                    <img
                        src="/assets/self-drive.png"
                        alt="Hire driver illustration"
                        className="w-64 h-auto mb-4 drop-shadow-lg rounded-xl"
                    />
                    <h1 className="text-2xl font-bold text-gray-800">Hire a Driver</h1>
                    <p className="text-sm text-gray-600 mt-2 max-w-xs">
                        Plan your trip freely and conveniently.
                    </p>
                </div>

                {/* Form section */}
                <form className="grid grid-cols-1 sm:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        {/* Pickup Location */}
                        <div className="col-span-2">
                            <label className="block mb-1 font-medium">Pick-up Location</label>
                            <div
                                className="flex items-center bg-gray-200 px-4 py-2 rounded cursor-pointer"
                                onClick={() => setShowPickupMap(true)}
                            >
                                <input
                                    type="text"
                                    value={pickupLocation}
                                    placeholder="Please enter the location"
                                    readOnly
                                    className="flex-1 bg-transparent outline-none placeholder:text-gray-500 cursor-pointer"
                                />
                                <FaMapMarkerAlt className="ml-2 text-gray-500" />
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
                        <div className="col-span-2">
                            <label className="block mb-1 font-medium">Drop-off Location</label>
                            <div
                                className="flex items-center bg-gray-200 px-4 py-2 rounded cursor-pointer"
                                onClick={() => setShowDropoffMap(true)}
                            >
                                <input
                                    type="text"
                                    value={dropoffLocation}
                                    placeholder="Please enter the location"
                                    readOnly
                                    className="flex-1 bg-transparent outline-none placeholder:text-gray-500 cursor-pointer"
                                />
                                <FaMapMarkerAlt className="ml-2 text-gray-500" />
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

                        <div>
                            <label className="block mb-1 font-medium">Pick-up Date</label>
                            <DatePicker
                                value={pickupDate}
                                onChange={setPickupDate}
                                format="MM/DD/YYYY"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Drop-off Date</label>
                            <DatePicker
                                value={dropoffDate}
                                onChange={setDropoffDate}
                                format="MM/DD/YYYY"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Pick-up Time</label>
                            <TimePicker value={pickupTime} onChange={setPickupTime} />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Drop-off Time</label>
                            <TimePicker value={dropoffTime} onChange={setDropoffTime} />
                        </div>
                    </LocalizationProvider>

                    <div className="col-span-2">
                        <label className="block mb-1 font-medium">Category</label>
                        <div className="relative">
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full bg-gray-200 px-4 py-2 rounded appearance-none pr-8"
                            >
                                <option value="">Select vehicle category</option>
                                {vehicleCategories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                            <IoMdArrowDropdown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
                        </div>
                    </div>

                    <div className="col-span-2 flex justify-center mt-4">
                        <button
                            type="submit"
                            className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 font-semibold transition-all"
                        >
                            Continue
                        </button>
                    </div>
                </form>
            </main>

            <Footer />
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default HireDriver;
