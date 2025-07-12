import { jwtDecode } from 'jwt-decode';

export const getToken = () => localStorage.getItem('token');

export const getUserFromToken = () => {
    try {
        const token = getToken();
        if (!token) return null;
        const decoded = jwtDecode(token);
        return decoded;
    } catch (err) {
        console.error("Token decode error:", err);
        return null;
    }
};

export const isAdmin = () => {
    const user = getUserFromToken();
    return user?.role === 'admin';
};
