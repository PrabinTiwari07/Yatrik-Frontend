import axios from "axios";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Customer = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [editFormData, setEditFormData] = useState({
        fullName: "",
        phone: "",
        address: "",
        email: "",
    });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const token = localStorage.getItem("token");

    const fetchUsers = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/admin/users", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(res.data.users);
        } catch (err) {
            toast.error("Failed to fetch users");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // ESC key closes modal
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") {
                setEditingUser(null);
                setShowDeleteModal(false);
            }
        };
        if (editingUser || showDeleteModal) {
            window.addEventListener("keydown", handleEsc);
        }
        return () => window.removeEventListener("keydown", handleEsc);
    }, [editingUser, showDeleteModal]);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/admin/users/${userToDelete}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("User deleted successfully");
            setShowDeleteModal(false);
            setUserToDelete(null);
            fetchUsers();
        } catch (err) {
            toast.error("Failed to delete user");
        }
    };

    const handleEditClick = (user) => {
        setEditingUser(user._id);
        setEditFormData({
            fullName: user.fullName,
            phone: user.phone,
            address: user.address,
            email: user.email,
        });
    };

    const handleUpdate = async () => {
        try {
            await axios.put(
                `http://localhost:3000/api/admin/users/${editingUser}`,
                {
                    fullName: editFormData.fullName,
                    phone: editFormData.phone,
                    address: editFormData.address,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            toast.success("User updated successfully");
            setEditingUser(null);
            fetchUsers();
        } catch (err) {
            toast.error("Failed to update user");
        }
    };

    return (
        <div>
            <ToastContainer position="top-right" autoClose={2000} />
            <h2 className="text-2xl font-bold mb-4">Customer Management</h2>
            {users.length === 0 ? (
                <p>No users found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-md">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="py-2 px-4 border-b">Name</th>
                                <th className="py-2 px-4 border-b">Email</th>
                                <th className="py-2 px-4 border-b">Phone</th>
                                <th className="py-2 px-4 border-b">Address</th>
                                <th className="py-2 px-4 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50">
                                    <td className="py-2 px-4 border-b">{user.fullName}</td>
                                    <td className="py-2 px-4 border-b">{user.email}</td>
                                    <td className="py-2 px-4 border-b">{user.phone}</td>
                                    <td className="py-2 px-4 border-b">{user.address}</td>
                                    <td className="py-2 px-4 border-b space-x-2 flex items-center">
                                        <button onClick={() => handleEditClick(user)} title="Edit">
                                            <FiEdit className="text-blue-600 text-lg" />
                                        </button>
                                        <button
                                            onClick={() => {
                                                setUserToDelete(user._id);
                                                setShowDeleteModal(true);
                                            }}
                                            title="Delete"
                                        >
                                            <FaTrash className="text-red-600 text-lg" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Edit Modal */}
            {editingUser && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg relative animate-fade-in">
                        {/* Close (X) Button */}
                        <button
                            onClick={() => setEditingUser(null)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
                            aria-label="Close"
                        >
                            &times;
                        </button>
                        <h3 className="text-2xl font-semibold mb-6 text-center text-blue-700">Edit User</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 transition"
                                    value={editFormData.fullName}
                                    onChange={(e) =>
                                        setEditFormData({ ...editFormData, fullName: e.target.value })
                                    }
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700">Phone</label>
                                <input
                                    type="text"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 transition"
                                    value={editFormData.phone}
                                    onChange={(e) =>
                                        setEditFormData({ ...editFormData, phone: e.target.value })
                                    }
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700">Address</label>
                                <input
                                    type="text"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 transition"
                                    value={editFormData.address}
                                    onChange={(e) =>
                                        setEditFormData({ ...editFormData, address: e.target.value })
                                    }
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700">Email (Read-Only)</label>
                                <input
                                    type="email"
                                    className="w-full p-3 border border-gray-200 rounded-lg bg-gray-100 cursor-not-allowed"
                                    value={editFormData.email}
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end gap-4">
                            <button
                                onClick={() => setEditingUser(null)}
                                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdate}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition"
                            >
                                Update User
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm text-center animate-fade-in">
                        <h3 className="text-xl font-semibold mb-6">Do you really want to delete this user?</h3>
                        <div className="flex justify-center gap-6">
                            <button
                                onClick={handleDelete}
                                className="px-8 py-2 bg-green-100 text-green-700 rounded-lg border border-green-300 hover:bg-green-200 font-semibold transition"
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => {
                                    setShowDeleteModal(false);
                                    setUserToDelete(null);
                                }}
                                className="px-8 py-2 bg-red-100 text-red-700 rounded-lg border border-red-300 hover:bg-red-200 font-semibold transition"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Customer;
