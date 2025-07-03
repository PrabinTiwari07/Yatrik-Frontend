// import { useState } from 'react';
// import { FaBars, FaBell, FaTimes } from 'react-icons/fa';
// import { NavLink } from 'react-router-dom';

// const Navbar = () => {
//     const [menuOpen, setMenuOpen] = useState(false);
//     const [profileOpen, setProfileOpen] = useState(false);

//     const navItems = ['Home', 'Contact', 'Self Drive', 'Hire a Driver'];

//     const toggleMenu = () => setMenuOpen(!menuOpen);
//     const toggleProfile = () => setProfileOpen(!profileOpen);

//     return (
//         <header className="sticky top-0 z-50 w-full px-4 py-4 bg-transparent backdrop-blur-md">

//             <div className="bg-[#A53041] text-white px-6 py-3 rounded-full shadow-xl flex items-center justify-between relative">
//                 {/* Logo */}
//                 <div className="flex items-center gap-3">
//                     <img
//                         src="/assets/logo.png"
//                         alt="Logo"
//                         className="h-12 w-12 bg-white p-1 rounded-full object-cover shadow-md"
//                     />
//                 </div>

//                 {/* Desktop Navigation */}
//                 <nav className="hidden md:flex gap-10 text-sm font-semibold">
//                     {navItems.map((item, i) => {
//                         const path = item.toLowerCase().replace(/ /g, '-');
//                         return (
//                             <NavLink
//                                 key={i}
//                                 to={`/home${path === 'home' ? '' : path}`}
//                                 className={({ isActive }) =>
//                                     `relative px-1 transition-all duration-200 ${isActive
//                                         ? 'text-white font-bold after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:bg-white'
//                                         : 'text-white/80 hover:text-white hover:after:absolute hover:after:-bottom-1 hover:after:left-0 hover:after:h-[2px] hover:after:w-full hover:after:bg-white hover:after:transition-all hover:after:duration-300'
//                                     }`
//                                 }
//                             >
//                                 {item}
//                             </NavLink>
//                         );
//                     })}
//                 </nav>

//                 {/* Right side: Bell, Profile, Hamburger */}
//                 <div className="flex items-center gap-4 md:gap-6">
//                     {/* Bell Icon */}
//                     <div className="relative">
//                         <FaBell className="text-white/80 text-lg hover:text-white transition cursor-pointer" />
//                         <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-red-500 border-2 border-white rounded-full animate-pulse" />
//                     </div>

//                     {/* Profile Image */}
//                     <div className="relative">
//                         <img
//                             src="/assets/profile.png"
//                             alt=""
//                             className="h-10 w-10 rounded-full object-cover border-2 border-white shadow-md hover:scale-105 transition-transform cursor-pointer"
//                             onClick={toggleProfile}
//                         />
//                         {profileOpen && (
//                             <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-lg rounded-md overflow-hidden z-50">
//                                 <NavLink to="/profile" className="block px-4 py-2 hover:bg-gray-100">
//                                     My Profile
//                                 </NavLink>
//                                 <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
//                                     Change Password
//                                 </button>
//                                 <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
//                                     Help
//                                 </button>
//                                 <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
//                                     Log Out
//                                 </button>
//                             </div>
//                         )}
//                     </div>

//                     {/* Hamburger for Mobile */}
//                     <button className="md:hidden text-xl" onClick={toggleMenu}>
//                         {menuOpen ? <FaTimes /> : <FaBars />}
//                     </button>
//                 </div>
//             </div>

//             {/* Mobile Menu */}
//             {menuOpen && (
//                 <div className="md:hidden mt-2 bg-[#A53041] text-white rounded-xl shadow-md px-4 py-3 space-y-3">
//                     {navItems.map((item, i) => {
//                         const path = item.toLowerCase().replace(/ /g, '-');
//                         return (
//                             <NavLink
//                                 key={i}
//                                 to={`/${path === 'home' ? '' : path}`}
//                                 onClick={() => setMenuOpen(false)}
//                                 className="block text-sm hover:text-white/90"
//                             >
//                                 {item}
//                             </NavLink>
//                         );
//                     })}
//                 </div>
//             )}
//         </header>
//     );
// };

// export default Navbar;


import { useState } from 'react';
import { FaBars, FaBell, FaTimes } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const navItems = ['Home', 'Contact', 'Self Drive', 'Hire a Driver'];

    const routeMap = {
        Home: '/home',
        Contact: '/contact',
        'Self Drive': '/self-drive',
        'Hire a Driver': '/hire-driver',
    };

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const toggleProfile = () => setProfileOpen(!profileOpen);

    return (
        <header className="sticky top-0 z-50 w-full px-4 py-4 bg-transparent backdrop-blur-md">

            <div className="bg-[#A53041] text-white px-6 py-3 rounded-full shadow-xl flex items-center justify-between relative">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <img
                        src="/assets/logo.png"
                        alt="Logo"
                        className="h-12 w-12 bg-white p-1 rounded-full object-cover shadow-md"
                    />
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex gap-10 text-sm font-semibold">
                    {navItems.map((item, i) => (
                        <NavLink
                            key={i}
                            to={routeMap[item]}
                            className={({ isActive }) =>
                                `relative px-1 transition-all duration-200 ${isActive
                                    ? 'text-white font-bold after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:bg-white'
                                    : 'text-white/80 hover:text-white hover:after:absolute hover:after:-bottom-1 hover:after:left-0 hover:after:h-[2px] hover:after:w-full hover:after:bg-white hover:after:transition-all hover:after:duration-300'
                                }`
                            }
                        >
                            {item}
                        </NavLink>
                    ))}
                </nav>

                {/* Right side: Bell, Profile, Hamburger */}
                <div className="flex items-center gap-4 md:gap-6">
                    {/* Bell Icon */}
                    <div className="relative">
                        <FaBell className="text-white/80 text-lg hover:text-white transition cursor-pointer" />
                        <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-red-500 border-2 border-white rounded-full animate-pulse" />
                    </div>

                    {/* Profile Image */}
                    <div className="relative">
                        <img
                            src="/assets/profile.png"
                            alt="Profile"
                            className="h-10 w-10 rounded-full object-cover border-2 border-white shadow-md hover:scale-105 transition-transform cursor-pointer"
                            onClick={toggleProfile}
                        />
                        {profileOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-lg rounded-md overflow-hidden z-50">
                                <NavLink to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                                    My Profile
                                </NavLink>
                                <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                                    Change Password
                                </button>
                                <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                                    Help
                                </button>
                                <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                                    Log Out
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Hamburger for Mobile */}
                    <button className="md:hidden text-xl" onClick={toggleMenu}>
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden mt-2 bg-[#A53041] text-white rounded-xl shadow-md px-4 py-3 space-y-3">
                    {navItems.map((item, i) => (
                        <NavLink
                            key={i}
                            to={routeMap[item]}
                            onClick={() => setMenuOpen(false)}
                            className={({ isActive }) =>
                                `block text-sm ${isActive ? 'font-bold text-white' : 'text-white/90'}`
                            }
                        >
                            {item}
                        </NavLink>
                    ))}
                </div>
            )}
        </header>
    );
};

export default Navbar;
