import { IconButton } from '@mui/material';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/footer';

const SelfDrive = () => {
    const [license, setLicense] = useState(null);
    const [licensePreview, setLicensePreview] = useState(null);
    const [pickupDate, setPickupDate] = useState(null);
    const [dropoffDate, setDropoffDate] = useState(null);
    const [pickupTime, setPickupTime] = useState(null);
    const [dropoffTime, setDropoffTime] = useState(null);
    const [pickupLocation, setPickupLocation] = useState('');
    const [dropoffLocation, setDropoffLocation] = useState('');

    const handleLicenseUpload = (e) => {
        const file = e.target.files[0];
        setLicense(file);
        setLicensePreview(URL.createObjectURL(file));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            !pickupLocation ||
            !dropoffLocation ||
            !pickupDate ||
            !dropoffDate ||
            !pickupTime ||
            !dropoffTime ||
            !license
        ) {
            toast.error('Please fill all the fields!', {
                position: 'top-right',
                autoClose: 3000,
            });
            return;
        }
        toast.success('Submitted successfully!', {
            position: 'top-right',
            autoClose: 3000,
        });
        // Proceed to next step here
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="bg-gray-100 min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow max-w-6xl mx-auto py-12 px-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Left: Image & Title */}
                    <div className="flex flex-col items-start justify-start text-left">
                        <img
                            src="/assets/self-drive.png"
                            alt="Self-drive car illustration"
                            className="w-64 h-auto mb-4 drop-shadow-lg rounded-xl"
                        />
                        <h1 className="text-2xl font-bold text-gray-800">Self Drive</h1>
                        <p className="text-sm text-gray-600 mt-2 max-w-xs">
                            Plan your trip freely and conveniently.
                        </p>
                    </div>

                    {/* Right: Form */}
                    <form className="grid grid-cols-1 sm:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                        {/* Pickup Location */}
                        <div>
                            <label className="block mb-1 font-medium">Pick-up Location</label>
                            <div className="flex items-center bg-gray-200 px-4 py-2 rounded">
                                <input
                                    type="text"
                                    placeholder="Enter location"
                                    value={pickupLocation}
                                    onChange={(e) => setPickupLocation(e.target.value)}
                                    className="flex-1 bg-transparent outline-none placeholder:text-gray-500"
                                />
                                <FaMapMarkerAlt className="ml-2 text-gray-500" />
                            </div>
                        </div>

                        {/* Drop-off Location */}
                        <div>
                            <label className="block mb-1 font-medium">Drop-off Location</label>
                            <div className="flex items-center bg-gray-200 px-4 py-2 rounded">
                                <input
                                    type="text"
                                    placeholder="Enter location"
                                    value={dropoffLocation}
                                    onChange={(e) => setDropoffLocation(e.target.value)}
                                    className="flex-1 bg-transparent outline-none placeholder:text-gray-500"
                                />
                                <FaMapMarkerAlt className="ml-2 text-gray-500" />
                            </div>
                        </div>

                        {/* Pickup Date */}
                        <div>
                            <label className="block mb-1 font-medium">Pick-up Date</label>
                            <DatePicker
                                value={pickupDate}
                                onChange={setPickupDate}
                                disablePast
                                format="MM/DD/YYYY"
                                slotProps={{
                                    textField: {
                                        placeholder: 'MM/DD/YYYY',
                                        variant: 'outlined',
                                        fullWidth: true,
                                        InputProps: {
                                            endAdornment: (
                                                <IconButton>
                                                    <FaCalendarAlt />
                                                </IconButton>
                                            ),
                                        },
                                    },
                                }}
                            />
                        </div>

                        {/* Drop-off Date */}
                        <div>
                            <label className="block mb-1 font-medium">Drop-off Date</label>
                            <DatePicker
                                value={dropoffDate}
                                onChange={setDropoffDate}
                                disablePast
                                format="MM/DD/YYYY"
                                slotProps={{
                                    textField: {
                                        placeholder: 'MM/DD/YYYY',
                                        variant: 'outlined',
                                        fullWidth: true,
                                        InputProps: {
                                            endAdornment: (
                                                <IconButton>
                                                    <FaCalendarAlt />
                                                </IconButton>
                                            ),
                                        },
                                    },
                                }}
                            />
                        </div>

                        {/* Pickup Time */}
                        <div>
                            <label className="block mb-1 font-medium">Pick-up Time</label>
                            <TimePicker
                                value={pickupTime}
                                onChange={setPickupTime}
                                ampm
                                slotProps={{
                                    textField: {
                                        placeholder: 'hh:mm aa',
                                        variant: 'outlined',
                                        fullWidth: true,
                                        InputProps: {
                                            endAdornment: (
                                                <IconButton>
                                                    <FaClock />
                                                </IconButton>
                                            ),
                                        },
                                    },
                                }}
                            />
                        </div>

                        {/* Drop-off Time */}
                        <div>
                            <label className="block mb-1 font-medium">Drop-off Time</label>
                            <TimePicker
                                value={dropoffTime}
                                onChange={setDropoffTime}
                                ampm
                                slotProps={{
                                    textField: {
                                        placeholder: 'hh:mm aa',
                                        variant: 'outlined',
                                        fullWidth: true,
                                        InputProps: {
                                            endAdornment: (
                                                <IconButton>
                                                    <FaClock />
                                                </IconButton>
                                            ),
                                        },
                                    },
                                }}
                            />
                        </div>

                        {/* Upload License */}
                        <div className="col-span-2">
                            <label htmlFor="license-upload" className="block mb-1 font-medium">
                                Upload Your License
                            </label>
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
                                        <img src={licensePreview} alt="Preview" className="mx-auto max-h-40 object-contain" />
                                    ) : (
                                        'Click to upload your license'
                                    )}
                                </label>
                            </div>
                        </div>

                        {/* Submit */}
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
                <ToastContainer />
            </div>
        </LocalizationProvider>
    );
};

export default SelfDrive;
