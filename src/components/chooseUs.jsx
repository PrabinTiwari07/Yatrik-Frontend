import { FaCarSide, FaHeadset, FaMoneyBillWave, FaShieldAlt } from 'react-icons/fa';

const features = [
    {
        icon: <FaCarSide className="text-2xl" />,
        title: 'Wide Selection of Vehicles',
    },
    {
        icon: <FaShieldAlt className="text-2xl" />,
        title: 'Verified Vehicles and drivers',
    },
    {
        icon: <FaMoneyBillWave className="text-2xl" />,
        title: 'Transparent Pricing',
    },
    {
        icon: <FaHeadset className="text-2xl" />,
        title: '24/7 Customer Support',
    },
];

const ChooseUs = () => {
    return (
        <section className="py-16 px-4 bg-white text-center">
            {/* Badge Title */}
            <div className="inline-block px-5 py-1.5 mb-6 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold">
                Why Choose Us?
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center space-y-3 hover:scale-105 transition-all duration-200 cursor-default"
                    >
                        <div className="bg-blue-50 p-4 rounded-xl text-black">
                            {feature.icon}
                        </div>
                        <p className="font-medium text-gray-800 text-sm md:text-base">{feature.title}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ChooseUs;
