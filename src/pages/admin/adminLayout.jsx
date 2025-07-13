import { Route, Routes } from 'react-router-dom';
import Navbar from './navbar';
import Sidebar from './sidebar';

import Drivers from './pages/adminDrivers';
import AdminProfileDetails from './pages/adminProfileDetails';
import AdminSelfDrive from './pages/adminSelfDrive';
import AdminServices from './pages/adminServices';
import AdminVehicles from './pages/adminVehicles'; // ✅ Import here
import Customer from './pages/customer';
import Dashboard from './pages/dashboard';
import HireDriver from './pages/hiredriver';

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
                        <Route path="drivers" element={<Drivers />} />
                        <Route path="customers" element={<Customer />} />
                        <Route path="hire-driver" element={<HireDriver />} />
                        <Route path="services" element={<AdminServices />} />
                        <Route path="vehicles" element={<AdminVehicles />} />
                        <Route path="self-drive" element={<AdminSelfDrive />} />
                        <Route path="user-profile" element={<AdminProfileDetails />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
