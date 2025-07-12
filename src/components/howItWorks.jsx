import { motion } from 'framer-motion';
import { FaArrowRight, FaCalendarAlt, FaCar, FaCheckCircle } from 'react-icons/fa';

const HowItWorks = () => {
    const steps = [
        {
            icon: <FaCheckCircle className="text-3xl" />,
            title: 'Choose Location',
            desc: 'Select your pickup location and find the perfect car for your journey',
            color: 'bg-blue-500',
            bgColor: 'bg-blue-50',
            hoverColor: 'hover:bg-blue-100'
        },
        {
            icon: <FaCalendarAlt className="text-3xl" />,
            title: 'Pick-up Date',
            desc: 'Select your preferred pickup date and time to reserve your vehicle',
            color: 'bg-green-500',
            bgColor: 'bg-green-50',
            hoverColor: 'hover:bg-green-100'
        },
        {
            icon: <FaCar className="text-3xl" />,
            title: 'Book Your Car',
            desc: 'Complete your booking and we will deliver the car directly to your location',
            color: 'bg-purple-500',
            bgColor: 'bg-purple-50',
            hoverColor: 'hover:bg-purple-100'
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
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
        <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center px-4 py-2 mb-6 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
                        <span className="mr-2">⚡</span>
                        HOW IT WORKS
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Rent with Following 3 Simple Steps
                    </h2>

                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Get your perfect vehicle in just three easy steps. Quick, simple, and hassle-free booking process.
                    </p>
                </motion.div>

                {/* Steps */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {steps.map((step, i) => (
                        <div key={i} className="relative">
                            <motion.div
                                className={`relative ${step.bgColor} ${step.hoverColor} rounded-2xl p-8 transition-all duration-300 hover:shadow-lg border border-white/50 group cursor-pointer`}
                                variants={itemVariants}
                                whileHover={{
                                    scale: 1.02,
                                    transition: { duration: 0.2 }
                                }}
                            >
                                {/* Step Number */}
                                <div className="absolute -top-4 -left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-gray-50">
                                    <span className="text-sm font-bold text-gray-700">{i + 1}</span>
                                </div>

                                {/* Icon Container */}
                                <div className={`w-16 h-16 ${step.color} rounded-xl flex items-center justify-center mb-6 text-white mx-auto group-hover:scale-110 transition-transform duration-300`}>
                                    {step.icon}
                                </div>

                                {/* Content */}
                                <div className="text-center">
                                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {step.desc}
                                    </p>
                                </div>

                                {/* Hover Effect */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </motion.div>

                            {/* Arrow Between Steps */}
                            {i < steps.length - 1 && (
                                <div className="hidden md:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                                    <div className="bg-white rounded-full p-2 shadow-md">
                                        <FaArrowRight className="text-gray-400 text-sm" />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </motion.div>

                {/* Call to Action */}
                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                            Ready to Get Started?
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Join thousands of satisfied customers who trust us for their travel needs.
                        </p>
                        <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                            Start Booking Now
                        </button>
                    </div>
                </motion.div>

                {/* Background Decoration */}
                <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200/30 rounded-full blur-xl"></div>
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-200/30 rounded-full blur-xl"></div>
            </div>
        </section>
    );
};

export default HowItWorks;
