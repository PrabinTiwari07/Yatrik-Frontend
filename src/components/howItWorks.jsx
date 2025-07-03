import { FaCalendarAlt, FaCar, FaCheckCircle } from 'react-icons/fa';

const HowItWorks = () => {
    const steps = [
        {
            icon: <FaCheckCircle className="text-2xl" />,
            title: 'Choose location',
            desc: 'Choose your and find your best car',
        },
        {
            icon: <FaCalendarAlt className="text-2xl" />,
            title: 'Pick-up date',
            desc: 'Select your pick up date and time to book your car',
        },
        {
            icon: <FaCar className="text-2xl" />,
            title: 'Book your car',
            desc: 'Book your car and we will deliver it directly to you',
        },
    ];

    return (
        <section className="py-16 px-4 bg-white text-center">
            {/* Badge */}
            <div className="inline-block px-5 py-1.5 mb-4 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold">
                HOW IT WORKS
            </div>

            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-10">
                Rent with following 3 working steps
            </h2>

            {/* Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {steps.map((step, i) => (
                    <button
                        key={i}
                        className="flex flex-col items-center text-center bg-blue-50 rounded-xl p-6 hover:bg-blue-100 active:scale-95 transition-all"
                    >
                        <div className="mb-4 text-black">{step.icon}</div>
                        <h3 className="font-semibold text-gray-800 mb-1">{step.title}</h3>
                        <p className="text-gray-600 text-sm">{step.desc}</p>
                    </button>
                ))}
            </div>
        </section>
    );
};

export default HowItWorks;
