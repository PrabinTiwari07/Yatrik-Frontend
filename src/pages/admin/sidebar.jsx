import { FaCar, FaChartBar, FaMapMarkerAlt, FaTools, FaTruck, FaUsers, FaUserTie } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const navItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: <FaChartBar /> },
        { name: 'Customer', path: '/admin/customers', icon: <FaUsers /> },
        { name: 'Hire Driver', path: '/admin/hire-driver', icon: <FaMapMarkerAlt /> },
        { name: 'Self Drive', path: '/admin/self-drive', icon: <FaCar /> },
        { name: 'Driver', path: '/admin/drivers', icon: <FaUserTie /> },
        { name: 'Services', path: '/admin/services', icon: <FaTools /> },
        { name: 'Vehicles', path: '/admin/vehicles', icon: <FaTruck /> }, // ✅ New Vehicles Link
    ];

    return (
        <aside className="w-64 bg-white shadow-md h-full">
            <div className="p-6 font-bold text-lg">Admin Panel</div>
            <nav className="flex flex-col gap-2 px-4">
                {navItems.map((item, idx) => (
                    <NavLink
                        key={idx}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-100 ${isActive ? 'bg-gray-200 font-semibold' : ''
                            }`
                        }
                    >
                        {item.icon}
                        {item.name}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
