// // Notifications.jsx
// import { useEffect, useState } from 'react';
// import { FaBell, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
// import Navbar from '../components/Navbar';

// const Notifications = () => {
//     const [notifications, setNotifications] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const fetchNotifications = async () => {
//         try {
//             setLoading(true);
//             setError(null);

//             const token = localStorage.getItem('token');
//             if (!token) {
//                 setError('Please login to view notifications');
//                 return;
//             }

//             console.log('🔍 Fetching notifications from: http://localhost:3000/api/notifications');
//             console.log('🔑 Token:', token ? 'Present' : 'Missing');

//             const res = await fetch('http://localhost:3000/api/notifications', {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'application/json'
//                 }
//             });

//             console.log('📡 Response status:', res.status);
//             console.log('📡 Response headers:', Object.fromEntries(res.headers.entries()));

//             if (!res.ok) {
//                 const errorText = await res.text();
//                 console.error('❌ Error response body:', errorText);
//                 throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
//             }

//             const data = await res.json();
//             console.log('✅ Notifications response:', data); // Debug log

//             if (data.success) {
//                 setNotifications(data.notifications || []);
//             } else {
//                 setError(data.message || 'Failed to fetch notifications');
//             }
//         } catch (err) {
//             console.error('❌ Error fetching notifications:', err);

//             // More specific error handling
//             if (err.message.includes('404')) {
//                 setError('Notifications API not found. Please check if the backend notifications routes are properly configured.');
//             } else if (err.message.includes('401')) {
//                 setError('Unauthorized. Please login again.');
//             } else if (err.message.includes('500')) {
//                 setError('Server error. Please try again later.');
//             } else {
//                 setError('Failed to load notifications. Please check your connection.');
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     const markAsRead = async (notificationId) => {
//         try {
//             const token = localStorage.getItem('token');
//             const res = await fetch(`http://localhost:3000/api/notifications/${notificationId}/read`, {
//                 method: 'PUT',
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });

//             if (res.ok) {
//                 // Update the notification in the local state
//                 setNotifications(prev =>
//                     prev.map(n =>
//                         n._id === notificationId ? { ...n, isRead: true } : n
//                     )
//                 );
//             }
//         } catch (err) {
//             console.error('Error marking notification as read:', err);
//         }
//     };

//     useEffect(() => {
//         fetchNotifications();
//     }, []);

//     if (loading) {
//         return (
//             <div className="min-h-screen bg-gray-50">
//                 <Navbar />
//                 <div className="flex items-center justify-center pt-20">
//                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-50">
//             <Navbar />
//             <div className="max-w-4xl mx-auto px-4 py-8">
//                 <div className="flex items-center gap-3 mb-6">
//                     <FaBell className="text-2xl text-blue-600" />
//                     <h2 className="text-3xl font-bold text-gray-800">Notifications</h2>
//                     <button
//                         onClick={fetchNotifications}
//                         className="ml-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm mr-2"
//                     >
//                         🔄 Refresh
//                     </button>
//                     <button
//                         onClick={() => {
//                             console.log('🧪 Testing notification creation...');
//                             const token = localStorage.getItem('token');
//                             console.log('🧪 Token for test:', token ? 'Present' : 'Missing');

//                             fetch('http://localhost:3000/api/notifications', {
//                                 method: 'POST',
//                                 headers: {
//                                     Authorization: `Bearer ${token}`,
//                                     'Content-Type': 'application/json'
//                                 },
//                                 body: JSON.stringify({
//                                     title: 'Test Notification',
//                                     message: 'This is a test notification to check if the API works.'
//                                 })
//                             })
//                                 .then(res => {
//                                     console.log('🧪 Test notification response status:', res.status);
//                                     return res.text();
//                                 })
//                                 .then(text => {
//                                     console.log('🧪 Test notification response:', text);
//                                     setTimeout(() => {
//                                         fetchNotifications(); // Refresh notifications after a delay
//                                     }, 500);
//                                 })
//                                 .catch(err => console.error('🧪 Test notification error:', err));
//                         }}
//                         className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
//                     >
//                         🧪 Test API
//                     </button>
//                 </div>

//                 {error && (
//                     <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
//                         <div className="flex items-center gap-2">
//                             <FaExclamationCircle className="text-red-500" />
//                             <p className="text-red-700">{error}</p>
//                         </div>
//                         <button
//                             onClick={fetchNotifications}
//                             className="mt-2 text-red-600 hover:text-red-800 underline"
//                         >
//                             Try again
//                         </button>
//                     </div>
//                 )}

//                 {notifications.length === 0 && !error ? (
//                     <div className="text-center py-12">
//                         <FaBell className="mx-auto text-6xl text-gray-300 mb-4" />
//                         <h3 className="text-xl font-medium text-gray-500 mb-2">No notifications yet</h3>
//                         <p className="text-gray-400">You'll see notifications here when you make bookings</p>
//                     </div>
//                 ) : (
//                     <div className="space-y-4">
//                         {notifications.map((n) => (
//                             <div
//                                 key={n._id}
//                                 className={`p-6 rounded-xl shadow-md border transition-all cursor-pointer hover:shadow-lg ${n.isRead
//                                     ? 'bg-white border-gray-200'
//                                     : 'bg-blue-50 border-blue-200 border-l-4 border-l-blue-500'
//                                     }`}
//                                 onClick={() => !n.isRead && markAsRead(n._id)}
//                             >
//                                 <div className="flex items-start gap-4">
//                                     <div className={`p-2 rounded-full ${n.isRead ? 'bg-gray-100' : 'bg-blue-100'
//                                         }`}>
//                                         <FaCheckCircle className={`text-lg ${n.isRead ? 'text-gray-500' : 'text-blue-600'
//                                             }`} />
//                                     </div>
//                                     <div className="flex-1">
//                                         <div className="flex items-center gap-2 mb-2">
//                                             <h4 className="font-semibold text-gray-800">{n.title}</h4>
//                                             {!n.isRead && (
//                                                 <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
//                                                     New
//                                                 </span>
//                                             )}
//                                         </div>
//                                         <p className="text-gray-600 mb-3 leading-relaxed">{n.message}</p>
//                                         <div className="flex items-center justify-between">
//                                             <span className="text-sm text-gray-400">
//                                                 {new Date(n.createdAt).toLocaleString()}
//                                             </span>
//                                             {!n.isRead && (
//                                                 <button
//                                                     onClick={(e) => {
//                                                         e.stopPropagation();
//                                                         markAsRead(n._id);
//                                                     }}
//                                                     className="text-blue-600 hover:text-blue-800 text-sm font-medium"
//                                                 >
//                                                     Mark as read
//                                                 </button>
//                                             )}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Notifications;


import { Menu } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { FaBell, FaCheckCircle, FaEllipsisV, FaExclamationCircle } from 'react-icons/fa';
import Navbar from '../components/Navbar';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        } catch (err) {
            console.error('Error deleting notification:', err);
        }
    };

    const markAllAsRead = async () => {
        try {
            const token = localStorage.getItem('token');
            await fetch('http://localhost:3000/api/notifications/mark-all-read', {
                method: 'PUT',
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchNotifications();
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
                        <button
                            onClick={fetchNotifications}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700"
                        >
                            Refresh 🔄
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
                                                                onClick={() => deleteNotification(n._id)}
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
        </div>
    );
};

export default Notifications;
