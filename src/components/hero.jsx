const Hero = () => {
    return (
        <section className="relative w-full h-[85vh] bg-cover bg-center" style={{ backgroundImage: "url('/assets/car.png')" }}>
            {/* Overlay (optional for better text readability) */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
                {/* Search Bar */}
                <div className="w-full max-w-md mb-6">
                    <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-lg">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="flex-grow px-3 py-2 rounded-full outline-none text-black placeholder-gray-400"
                        />
                        <svg
                            className="w-5 h-5 text-gray-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM14 8a6 6 0 11-12 0 6 6 0 0112 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </div>

                {/* Heading */}
                <h1 className="text-3xl md:text-4xl font-semibold mb-3 drop-shadow">
                    Travel with Ease in Nepal
                </h1>
                <p className="text-white/90 text-sm md:text-base mb-6">
                    Book any vehicles, anywhere in Nepal instantly and safely
                </p>

                {/* CTA Button */}
                <button className="bg-black text-white font-semibold px-6 py-2 rounded-full hover:bg-gray-800 transition">
                    See More...
                </button>
            </div>
        </section>
    );
};

export default Hero;
