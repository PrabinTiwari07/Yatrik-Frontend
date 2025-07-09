import { jwtDecode } from 'jwt-decode';
import { Navigate, Outlet } from 'react-router-dom';

const getUserRole = () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) return null;
        const decoded = jwtDecode(token);
        return decoded.role;
    } catch (err) {
        return null;
    }
};

const ProtectedAdminRoute = () => {
    const role = getUserRole();

    if (role !== 'admin') {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedAdminRoute;
