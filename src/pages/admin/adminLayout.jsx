import { Route, Routes } from 'react-router-dom';
import Navbar from './navbar';
import Sidebar from './sidebar';

// import Drivers from './pages/adminDrivers';
// import AdminHireDriver from './pages/adminHireDriver';
// import Dashboard from './pages/dashboard';
// import SelfDrive from './pages/selfDrive';
// import Services from './pages/services';

import Drivers from './pages/adminDrivers';
import AdminServices from './pages/adminServices'; // Make sure this import exists
import Customer from './pages/customer';
import Dashboard from './pages/dashboard';
import HireDriver from './pages/hiredriver';
import SelfDrive from './pages/selfDrive';


const AdminLayout = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="flex-1 p-6 overflow-y-auto">
                    <Routes>
                        <Route index element={<Dashboard />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="self-drive" element={<SelfDrive />} />
                        <Route path="drivers" element={<Drivers />} />
                        <Route path="customers" element={<Customer />} />
                        <Route path="hire-driver" element={<HireDriver />} />
                        <Route path="services" element={<AdminServices />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
