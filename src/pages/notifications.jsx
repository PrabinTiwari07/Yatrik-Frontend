

import { Menu } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { FaBell, FaCheckCircle, FaEllipsisV, FaExclamationCircle } from 'react-icons/fa';
import Navbar from '../components/Navbar';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [toDeleteId, setToDeleteId] = useState(null);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            setError(null);

            const token = localStorage.getItem('token');
            if (!token) {
                setError('Please login to view notifications');
                return;
            }

            const res = await fetch('http://localhost:3000/api/notifications', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
            }

            const data = await res.json();
            if (data.success) {
                setNotifications(data.notifications || []);
            } else {
                setError(data.message || 'Failed to fetch notifications');
            }
        } catch (err) {
            console.error('❌ Error fetching notifications:', err);
            setError('Failed to load notifications. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await fetch(`http://localhost:3000/api/notifications/${id}/read`, {
                method: 'PUT',
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchNotifications();
            // Trigger a custom event to update navbar count
            window.dispatchEvent(new CustomEvent('notificationUpdate'));
        } catch (err) {
            console.error('Error marking as read:', err);
        }
    };

    const deleteNotification = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await fetch(`http://localhost:3000/api/notifications/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchNotifications();
            // Trigger a custom event to update navbar count
            window.dispatchEvent(new CustomEvent('notificationUpdate'));
        } catch (err) {
            console.error('Error deleting notification:', err);
        }
    };

    const handleDeleteClick = (id) => {
        setToDeleteId(id);
        setShowConfirm(true);
    };

    const handleConfirmDelete = async () => {
        if (toDeleteId) {
            await deleteNotification(toDeleteId);
        }
        setShowConfirm(false);
        setToDeleteId(null);
    };

    const handleCancelDelete = () => {
        setShowConfirm(false);
        setToDeleteId(null);
    };

    const markAllAsRead = async () => {
        try {
            const token = localStorage.getItem('token');
            await fetch('http://localhost:3000/api/notifications/mark-all-read', {
                method: 'PUT',
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchNotifications();
            // Trigger a custom event to update navbar count
            window.dispatchEvent(new CustomEvent('notificationUpdate'));
        } catch (err) {
            console.error('Error marking all as read:', err);
        }
    };

    const deleteAllNotifications = async () => {
        try {
            const token = localStorage.getItem('token');
            await fetch('http://localhost:3000/api/notifications/delete-all', {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchNotifications();
            // Trigger a custom event to update navbar count
            window.dispatchEvent(new CustomEvent('notificationUpdate'));
        } catch (err) {
            console.error('Error deleting all notifications:', err);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="flex items-center justify-center pt-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="flex items-center gap-3 mb-6 flex-wrap">
                    <FaBell className="text-2xl text-blue-600" />
                    <h2 className="text-3xl font-bold text-gray-800">Notifications</h2>

                    <div className="ml-auto flex gap-2">
                        <button
                            onClick={markAllAsRead}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700"
                        >
                            Mark All as Read
                        </button>
                        <button
                            onClick={deleteAllNotifications}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700"
                        >
                            Delete All
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <div className="flex items-center gap-2">
                            <FaExclamationCircle className="text-red-500" />
                            <p className="text-red-700">{error}</p>
                        </div>
                        <button
                            onClick={fetchNotifications}
                            className="mt-2 text-red-600 hover:text-red-800 underline"
                        >
                            Try again
                        </button>
                    </div>
                )}

                {notifications.length === 0 && !error ? (
                    <div className="text-center py-12">
                        <FaBell className="mx-auto text-6xl text-gray-300 mb-4" />
                        <h3 className="text-xl font-medium text-gray-500 mb-2">No notifications yet</h3>
                        <p className="text-gray-400">You'll see notifications here when bookings are made</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {notifications.map((n) => (
                            <div
                                key={n._id}
                                className={`p-6 rounded-xl shadow-md border transition-all hover:shadow-lg cursor-pointer ${n.isRead
                                    ? 'bg-white border-gray-200'
                                    : 'bg-blue-50 border-blue-200 border-l-4 border-l-blue-500'
                                    }`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`p-2 rounded-full ${n.isRead ? 'bg-gray-100' : 'bg-blue-100'}`}>
                                        <FaCheckCircle
                                            className={`text-lg ${n.isRead ? 'text-gray-500' : 'text-blue-600'
                                                }`}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-semibold text-gray-800">{n.title}</h4>
                                            <Menu as="div" className="relative inline-block text-left">
                                                <Menu.Button className="p-1 rounded hover:bg-gray-200 focus:outline-none">
                                                    <FaEllipsisV className="text-gray-500" />
                                                </Menu.Button>
                                                <Menu.Items className="absolute right-0 z-10 mt-2 w-44 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none">
                                                    {!n.isRead && (
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <button
                                                                    onClick={() => markAsRead(n._id)}
                                                                    className={`${active ? 'bg-gray-100' : ''
                                                                        } w-full px-4 py-2 text-left text-sm text-gray-700`}
                                                                >
                                                                    ✅ Mark as Read
                                                                </button>
                                                            )}
                                                        </Menu.Item>
                                                    )}
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <button
                                                                onClick={() => handleDeleteClick(n._id)}
                                                                className={`${active ? 'bg-gray-100' : ''
                                                                    } w-full px-4 py-2 text-left text-sm text-red-600`}
                                                            >
                                                                🗑 Delete
                                                            </button>
                                                        )}
                                                    </Menu.Item>
                                                </Menu.Items>
                                            </Menu>
                                        </div>
                                        <p className="text-gray-600 mb-3">{n.message}</p>
                                        <span className="text-sm text-gray-400">
                                            {new Date(n.createdAt).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {/* Confirm Delete Modal */}
            {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md mx-4 transform transition-all">
                        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full">
                            <FaExclamationCircle className="w-8 h-8 text-red-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-gray-900 text-center">Confirm Deletion</h3>
                        <p className="mb-8 text-gray-600 text-center leading-relaxed">
                            Are you sure you want to permanently delete this notification? This action cannot be undone.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <button
                                onClick={handleCancelDelete}
                                className="flex-1 px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-20 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className="flex-1 px-6 py-3 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors"
                            >
                                Delete Notification
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Notifications;
