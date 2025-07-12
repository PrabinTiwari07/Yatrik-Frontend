import { motion } from 'framer-motion';
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
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Navigate to search results page with the query as a URL parameter
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

    return (
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image with Gradient Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center transform scale-110 transition-transform duration-7000 ease-in-out hover:scale-100"
                style={{
                    backgroundImage: "url('/assets/car.png')",
                    backgroundPosition: 'center',
                    backgroundRepeat: 'on loop',
                    backgroundSize: 'dynamic'
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-6xl px-6 py-20 mx-auto">
                <motion.div
                    className="text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        Explore Nepal's Beauty <br />
                        <span className="text-red-500">With Ease</span>
                    </h1>
                </motion.div>

                {/* Search Card */}
                <motion.div
                    className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20 ${isScrolled ? 'mt-20' : 'mt-10'}`}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                >


                    {/* Search Form */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <div className="relative flex items-center bg-white/5 border border-white/10 rounded-lg p-3 cursor-pointer" onClick={() => setShowMap(true)}>
                            <FiMapPin className="text-white mr-3 text-xl" />
                            <div className="w-full">
                                <input
                                    type="text"
                                    placeholder="Where to?"
                                    className="bg-transparent border-none w-full text-white placeholder-white/60 focus:outline-none cursor-pointer"
                                    value={selectedLocation}
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className="relative flex items-center bg-white/5 border border-white/10 rounded-lg p-3">
                            <FiCalendar className="text-white mr-3 text-xl" />
                            <input
                                type="date"
                                className="bg-transparent border-none w-full text-white placeholder-white/60 focus:outline-none"
                                placeholder="When?"
                            />
                        </div>

                        <div className="relative flex items-center bg-white/5 border border-white/10 rounded-lg p-3">
                            <FiUsers className="text-white mr-3 text-xl" />
                            <select className="bg-transparent border-none w-full text-white focus:outline-none appearance-none"
                                onChange={(e) => {
                                    if (e.target.value) {
                                        navigate(`/search?type=passengers&value=${e.target.value}`);
                                    }
                                }}>
                                <option value="">Passengers</option>
                                <option value="1">1 Passenger</option>
                                <option value="2">2 Passengers</option>
                                <option value="3">3 Passengers</option>
                                <option value="4">4+ Passengers</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-4">
                        <button
                            className="w-full md:w-auto bg-white text-gray-600 font-semibold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center"
                            onClick={() => {
                                if (selectedLocation) {
                                    navigate(`/search?location=${encodeURIComponent(selectedLocation)}`);
                                }
                            }}
                        >
                            <FiSearch className="mr-2" />
                            Search
                        </button>
                    </div>
                </motion.div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
                    {[
                        { number: '500+', label: 'Happy Customers' },
                        { number: '50+', label: 'Vehicles' },
                        { number: '50+', label: 'Destinations' },
                        { number: '24/7', label: 'Customer Support' }
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            className="text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + (index * 0.1) }}
                        >
                            <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                            <div className="text-white/80 text-sm uppercase tracking-wider">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Map Picker Modal */}
            {showMap && (
                <Suspense fallback={<div>Loading...</div>}>
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
