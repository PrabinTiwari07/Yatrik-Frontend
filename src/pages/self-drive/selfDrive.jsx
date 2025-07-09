import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
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

    const handleLicenseUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLicense(file);
            setLicensePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!pickupCoords || !pickupLocation?.trim()) {
            return toast.error("Please select a valid pickup location.");
        }
        if (!dropoffCoords || !dropoffLocation?.trim()) {
            return toast.error("Please select a valid dropoff location.");
        }

        if (!pickupDate || !pickupTime) {
            return toast.error("Please select pickup date & time.");
        }
        if (!dropoffDate || !dropoffTime) {
            return toast.error("Please select dropoff date & time.");
        }
        if (!license) {
            return toast.error("Please upload your license.");
        }
        if (!license) {
            return toast.error("Please upload your license.");
        }

        toast.success("Form submitted successfully!");
        console.log({
            pickupLocation,
            pickupCoords,
            dropoffLocation,
            dropoffCoords,
            pickupDate,
            pickupTime,
            dropoffDate,
            dropoffTime,
            license
        });
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow max-w-6xl mx-auto py-12 px-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="flex flex-col">
                    <img
                        src="/assets/self-drive.png"
                        alt="Self-drive illustration"
                        className="w-64 h-auto mb-4 drop-shadow-lg rounded-xl"
                    />
                    <h1 className="text-2xl font-bold text-gray-800">Self Drive</h1>
                    <p className="text-sm text-gray-600 mt-2 max-w-xs">
                        Plan your trip freely and conveniently.
                    </p>
                </div>

                <form className="grid grid-cols-1 sm:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>

                        <div className="col-span-2">
                            <label className="block mb-1 font-medium">Pick-up Location</label>
                            <div
                                className="relative"
                                onClick={() => setShowPickupMap(true)}
                            >
                                <input
                                    type="text"
                                    value={pickupLocation}
                                    placeholder="Click to choose location"
                                    readOnly
                                    className="w-full bg-white border border-gray-300 px-4 py-3 rounded shadow-sm cursor-pointer placeholder:text-gray-500"
                                />
                                <FaMapMarkerAlt className="absolute right-3 top-3.5 text-gray-500 pointer-events-none" />
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

                        <div className="col-span-2">
                            <label className="block mb-1 font-medium">Drop-off Location</label>
                            <div
                                className="relative"
                                onClick={() => setShowDropoffMap(true)}
                            >
                                <input
                                    type="text"
                                    value={dropoffLocation}
                                    placeholder="Click to choose location"
                                    readOnly
                                    className="w-full bg-white border border-gray-300 px-4 py-3 rounded shadow-sm cursor-pointer placeholder:text-gray-500"
                                />
                                <FaMapMarkerAlt className="absolute right-3 top-3.5 text-gray-500 pointer-events-none" />
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
                                onChange={(date) => setPickupDate(date)}
                                format="MM/DD/YYYY"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Drop-off Date</label>
                            <DatePicker
                                value={dropoffDate}
                                onChange={(date) => setDropoffDate(date)}
                                format="MM/DD/YYYY"
                            />
                        </div>

                        {/* Times */}
                        <div>
                            <label className="block mb-1 font-medium">Pick-up Time</label>
                            <TimePicker
                                value={pickupTime}
                                onChange={(time) => setPickupTime(time)}
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Drop-off Time</label>
                            <TimePicker
                                value={dropoffTime}
                                onChange={(time) => setDropoffTime(time)}
                            />
                        </div>
                    </LocalizationProvider>

                    <div className="col-span-2">
                        <label className="block mb-1 font-medium">Upload Your License</label>
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
                                    <img src={licensePreview} alt="License Preview" className="h-32 mx-auto object-contain" />
                                ) : 'Click to upload your license'}
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
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default SelfDrive;
