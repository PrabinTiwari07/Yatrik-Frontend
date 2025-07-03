import { FaSearchLocation } from 'react-icons/fa';

const ExploreNepal = () => {
    return (
        <section className="py-16 px-4 bg-white text-center">
            {/* Title Badge */}
            <div className="inline-block px-5 py-1.5 mb-6 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold">
                Explore Nepal
            </div>

            {/* Map Image */}
            <div className="flex justify-center">
                <div className="relative max-w-[600px] w-full">
                    <img
                        src="/assets/map.png"
                        alt="Nepal Map"
                        className="w-full rounded-md"
                    />
                    {/* Location Pin (optional positioning tweak via absolute if needed) */}
                    <div className="absolute top-[36%] left-[55%] -translate-x-1/2 -translate-y-1/2">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xl shadow-md">
                        </div>
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="mt-8 flex justify-center">
                <div className="flex items-center bg-gray-200 rounded-full px-4 py-2 w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent outline-none flex-grow text-gray-700 font-semibold px-2"
                    />
                    <FaSearchLocation className="text-xl text-gray-500" />
                </div>
            </div>
        </section>
    );
};

export default ExploreNepal;
