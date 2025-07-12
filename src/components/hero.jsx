import { lazy, Suspense, useEffect, useState } from 'react';
import { FiCalendar, FiMapPin, FiSearch, FiUsers } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

// Dynamically import MapPicker with no SSR
const MapPicker = lazy(() => import('./mapPicker'));

const Hero = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedPassengers, setSelectedPassengers] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLocationSelect = (location) => {
        setSelectedLocation(location);
        setShowMap(false);
    };

    const handleSearchClick = () => {
        const params = new URLSearchParams();
        if (selectedLocation) params.append('location', selectedLocation);
        if (selectedDate) params.append('date', selectedDate);
        if (selectedPassengers) params.append('passengers', selectedPassengers);

        navigate(`/search?${params.toString()}`);
    };

    return (
        <section className="relative w-full min-h-screen flex items-center justify-center">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/assets/car.png')",
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-6xl px-6 py-20 mx-auto">
                {/* Hero Text */}
                <div className="text-white mb-12 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        Explore Nepal's
                        <br />
                        <span className="text-blue-400">Beauty With Ease</span>
                    </h1>

                    <p className="text-xl text-white/90 max-w-2xl mx-auto">
                        Discover breathtaking destinations across Nepal with our premium vehicle rental service.
                    </p>
                </div>

                {/* Search Card */}
                <div className="bg-white rounded-2xl p-6 shadow-xl max-w-4xl mx-auto">
                    <h3 className="text-gray-800 text-xl font-semibold mb-6 text-center">Find Your Perfect Ride</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div
                            className="flex items-center border border-gray-300 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors"
                            onClick={() => setShowMap(true)}
                        >
                            <FiMapPin className="text-gray-500 mr-3 text-xl" />
                            <div className="w-full">
                                <label className="text-gray-500 text-sm mb-1 block">Location</label>
                                <input
                                    type="text"
                                    placeholder="Where to?"
                                    className="border-none w-full text-gray-800 focus:outline-none cursor-pointer"
                                    value={selectedLocation}
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className="flex items-center border border-gray-300 rounded-lg p-4 hover:border-blue-500 transition-colors">
                            <FiCalendar className="text-gray-500 mr-3 text-xl" />
                            <div className="w-full">
                                <label className="text-gray-500 text-sm mb-1 block">Date</label>
                                <input
                                    type="date"
                                    className="border-none w-full text-gray-800 focus:outline-none"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    min={new Date().toISOString().split('T')[0]}
                                />
                            </div>
                        </div>

                        <div className="flex items-center border border-gray-300 rounded-lg p-4 hover:border-blue-500 transition-colors">
                            <FiUsers className="text-gray-500 mr-3 text-xl" />
                            <div className="w-full">
                                <label className="text-gray-500 text-sm mb-1 block">Passengers</label>
                                <select
                                    className="border-none w-full text-gray-800 focus:outline-none"
                                    value={selectedPassengers}
                                    onChange={(e) => setSelectedPassengers(e.target.value)}
                                >
                                    <option value="">Select passengers</option>
                                    <option value="1">1 Passenger</option>
                                    <option value="2">2 Passengers</option>
                                    <option value="3">3 Passengers</option>
                                    <option value="4">4+ Passengers</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors flex items-center justify-center"
                        onClick={handleSearchClick}
                    >
                        <FiSearch className="mr-3" />
                        Search Available Vehicles
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
                    {[
                        { number: '500+', label: 'Happy Customers' },
                        { number: '50+', label: 'Premium Vehicles' },
                        { number: '50+', label: 'Destinations' },
                        { number: '24/7', label: 'Customer Support' }
                    ].map((stat, index) => (
                        <div key={index} className="text-center text-white">
                            <div className="text-3xl font-bold mb-2">{stat.number}</div>
                            <div className="text-white/80 text-sm">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Map Picker Modal */}
            {showMap && (
                <Suspense fallback={
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                            <p className="mt-2 text-gray-600">Loading map...</p>
                        </div>
                    </div>
                }>
                    <MapPicker
                        onSelect={handleLocationSelect}
                        onClose={() => setShowMap(false)}
                    />
                </Suspense>
            )}
        </section>
    );
};

export default Hero;
