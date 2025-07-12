import { motion } from 'framer-motion';
import { lazy, Suspense, useState } from 'react';
import { FaMapMarkerAlt, FaMountain, FaRoute, FaSearchLocation } from 'react-icons/fa';

// Dynamically import MapPicker
const MapPicker = lazy(() => import('./mapPicker'));

const ExploreNepal = () => {
    const [showMap, setShowMap] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const destinations = [
        { name: 'Kathmandu', position: { top: '45%', left: '50%' }, color: 'bg-red-500' },
        { name: 'Pokhara', position: { top: '40%', left: '35%' }, color: 'bg-blue-500' },
        { name: 'Chitwan', position: { top: '55%', left: '45%' }, color: 'bg-green-500' },
        { name: 'Everest', position: { top: '35%', left: '75%' }, color: 'bg-purple-500' },
    ];

    const handleSearch = () => {
        setShowMap(true);
    };

    const handleLocationSelect = (location) => {
        setSearchTerm(location);
        setShowMap(false);
        // You can add additional logic here to handle the selected location
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-blue-200/20 rounded-full translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/20 rounded-full -translate-x-1/3 translate-y-1/3"></div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center px-4 py-2 mb-6 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
                        <FaMountain className="mr-2" />
                        EXPLORE NEPAL
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Discover Beautiful Destinations
                    </h2>

                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        From the majestic Himalayas to vibrant cities, explore Nepal's incredible diversity with our reliable transport services.
                    </p>
                </motion.div>

                {/* Interactive Map Section */}
                <motion.div
                    className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    {/* Map Container */}
                    <div className="flex justify-center mb-8">
                        <div className="relative max-w-[600px] w-full group">
                            <motion.img
                                src="/assets/map.png"
                                alt="Nepal Map"
                                className="w-full rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-105"
                                whileHover={{ scale: 1.02 }}
                            />

                            {/* Interactive Location Pins */}
                            {destinations.map((destination, index) => (
                                <motion.div
                                    key={index}
                                    className="absolute cursor-pointer group/pin"
                                    style={{
                                        top: destination.position.top,
                                        left: destination.position.left,
                                        transform: 'translate(-50%, -50%)'
                                    }}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                                    whileHover={{ scale: 1.2 }}
                                >
                                    <div className={`w-4 h-4 ${destination.color} rounded-full border-2 border-white shadow-lg animate-pulse`}></div>
                                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs opacity-0 group-hover/pin:opacity-100 transition-opacity whitespace-nowrap">
                                        {destination.name}
                                    </div>
                                </motion.div>
                            ))}

                            {/* Map Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                    </div>

                    {/* Enhanced Search Bar */}
                    <motion.div
                        className="max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <div className="relative">
                            <div className="flex items-center bg-gray-100 hover:bg-gray-200 rounded-2xl px-6 py-4 transition-colors duration-300 border-2 border-transparent focus-within:border-blue-500 focus-within:bg-white">
                                <FaSearchLocation className="text-2xl text-blue-500 mr-4" />
                                <input
                                    type="text"
                                    placeholder="Search destinations in Nepal..."
                                    className="bg-transparent outline-none flex-grow text-gray-700 font-medium placeholder-gray-500 text-lg"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                />
                                <motion.button
                                    onClick={handleSearch}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition-colors duration-300 font-semibold ml-4"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Search
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Quick Destination Cards */}
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        viewport={{ once: true }}
                    >
                        {destinations.map((destination, index) => (
                            <motion.div
                                key={index}
                                className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 cursor-pointer group"
                                whileHover={{ scale: 1.05, y: -5 }}
                                onClick={() => setSearchTerm(destination.name)}
                            >
                                <div className={`w-8 h-8 ${destination.color} rounded-full mb-3 mx-auto group-hover:scale-110 transition-transform duration-200`}></div>
                                <h4 className="font-semibold text-gray-800 text-center text-sm group-hover:text-blue-600 transition-colors">
                                    {destination.name}
                                </h4>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Features Section */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    {[
                        {
                            icon: <FaMapMarkerAlt className="text-2xl text-blue-500" />,
                            title: 'Easy Location Search',
                            description: 'Find and book vehicles for any destination across Nepal'
                        },
                        {
                            icon: <FaRoute className="text-2xl text-green-500" />,
                            title: 'Best Routes',
                            description: 'Get recommendations for the most scenic and safe routes'
                        },
                        {
                            icon: <FaMountain className="text-2xl text-purple-500" />,
                            title: 'Mountain Adventures',
                            description: 'Special vehicles equipped for high-altitude mountain trips'
                        }
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="mb-4">{feature.icon}</div>
                            <h3 className="font-bold text-gray-800 mb-2">{feature.title}</h3>
                            <p className="text-gray-600 text-sm">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
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

export default ExploreNepal;