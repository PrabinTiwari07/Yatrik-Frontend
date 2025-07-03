const AboutUs = () => {
    return (
        <section className="py-16 px-6 bg-white text-gray-800">
            {/* Section Title */}
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-2">About Us</h2>
                <p className="text-gray-600 max-w-xl mx-auto">
                    Learn how <span className="text-[#A53041] font-semibold">MeroYatra</span> is reshaping travel across Nepal.
                </p>
            </div>

            {/* Side-by-side Layout */}
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
                {/* Image */}
                <div>
                    <img
                        src="/assets/car.png"
                        alt="About MeroYatra"
                        className="w-full rounded-xl shadow-lg object-cover"
                    />
                </div>

                {/* Text Content */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">Your Travel Partner in Nepal</h3>
                    <p className="text-gray-700 mb-4">
                        MeroYatra is a one-stop platform for renting reliable vehicles — whether you're heading to the mountains, exploring the city, or planning a business trip.
                    </p>
                    <ul className="list-disc pl-5 text-gray-700 space-y-2">
                        <li>All types of vehicles — bikes, cars, jeeps, buses & more</li>
                        <li>Verified drivers and instant self-drive bookings</li>
                        <li>Service coverage across Nepal</li>
                        <li>Transparent pricing and 24/7 support</li>
                    </ul>
                    <p className="mt-4 text-gray-700">
                        We believe travel should be safe, flexible, and accessible for everyone — and that's exactly what MeroYatra delivers.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
