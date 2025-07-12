import { motion } from 'framer-motion';
import { FaCarSide, FaHeadset, FaMoneyBillWave, FaShieldAlt, FaStar } from 'react-icons/fa';

const features = [
    {
        icon: <FaCarSide className="text-3xl" />,
        title: 'Wide Selection of Vehicles',
        description: 'Choose from our premium fleet of cars, bikes, and SUVs',
        color: 'bg-blue-500',
        bgColor: 'bg-blue-50',
        hoverBg: 'hover:bg-blue-100'
    },
    {
        icon: <FaShieldAlt className="text-3xl" />,
        title: 'Verified Vehicles & Drivers',
        description: 'All vehicles and drivers are thoroughly verified for your safety',
        color: 'bg-green-500',
        bgColor: 'bg-green-50',
        hoverBg: 'hover:bg-green-100'
    },
    {
        icon: <FaMoneyBillWave className="text-3xl" />,
        title: 'Transparent Pricing',
        description: 'No hidden charges, clear pricing with upfront cost breakdown',
        color: 'bg-orange-500',
        bgColor: 'bg-orange-50',
        hoverBg: 'hover:bg-orange-100'
    },
    {
        icon: <FaHeadset className="text-3xl" />,
        title: '24/7 Customer Support',
        description: 'Round-the-clock assistance for all your travel needs',
        color: 'bg-purple-500',
        bgColor: 'bg-purple-50',
        hoverBg: 'hover:bg-purple-100'
    },
];

const ChooseUs = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200/20 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200/20 rounded-full translate-x-1/3 translate-y-1/3"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center px-4 py-2 mb-6 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
                        <FaStar className="mr-2 text-yellow-500" />
                        WHY CHOOSE US?
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        We Provide the Best Service
                    </h2>

                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Experience hassle-free car rentals with our premium services designed for your comfort and convenience.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className={`group bg-white rounded-2xl p-6 shadow-lg border border-gray-100 ${feature.hoverBg} transition-all duration-300 cursor-pointer hover:shadow-xl hover:-translate-y-2`}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                        >
                            {/* Icon Container */}
                            <div className={`${feature.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6 text-white mx-auto group-hover:scale-110 transition-transform duration-300`}>
                                {feature.icon}
                            </div>

                            {/* Content */}
                            <div className="text-center">
                                <h3 className="font-bold text-gray-800 text-lg mb-3 group-hover:text-gray-900 transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors">
                                    {feature.description}
                                </p>
                            </div>

                            {/* Hover Effect Overlay */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Stats Section */}
                <motion.div
                    className="mt-20 bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { number: '500+', label: 'Happy Customers', icon: '😊' },
                            { number: '50+', label: 'Premium Vehicles', icon: '🚗' },
                            { number: '98%', label: 'Customer Satisfaction', icon: '⭐' },
                            { number: '24/7', label: 'Support Available', icon: '🎧' }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                className="group"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 1 + (index * 0.1) }}
                                viewport={{ once: true }}
                            >
                                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200">
                                    {stat.icon}
                                </div>
                                <div className="text-3xl font-bold text-gray-800 mb-1">
                                    {stat.number}
                                </div>
                                <div className="text-gray-600 text-sm font-medium">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ChooseUs;
