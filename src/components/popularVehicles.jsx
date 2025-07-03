const vehicles = [
    {
        name: 'Hyundai Santa Fe',
        src: '/assets/car.jpg',
    },
    {
        name: 'Johan Liebert',
        src: '/assets/car.jpg',
    },
    {
        name: 'Himiko Toga',
        src: '/assets/car.png',
    },
    {
        name: 'KTM Duke 350',
        src: '/assets/car.png',
    },
    {
        name: 'Hikigaya Hachiman',
        src: '/assets/bik.jpg',
    },
    {
        name: 'Audi SQ7 TFSI',
        src: '/assets/car.png',
    },
];

const PopularVehicles = () => {
    return (
        <section className="py-16 px-4 bg-white text-center">
            {/* Badge */}
            <div className="inline-block px-5 py-1.5 mb-4 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold">
                Popular Vehicles
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {vehicles.map((vehicle, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300 p-3"
                    >
                        <img
                            src={vehicle.src}
                            alt={vehicle.name}
                            className="rounded-md w-full h-48 object-cover mb-3"
                        />
                        <h3 className="text-gray-800 font-semibold">{vehicle.name}</h3>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PopularVehicles;
