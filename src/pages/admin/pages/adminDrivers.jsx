import axios from 'axios';
import { useEffect, useState } from 'react';
import {
    FaEdit, FaPlus, FaTimes,
    FaToggleOff,
    FaToggleOn,
    FaTrash
} from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_BASE = 'http://localhost:3000/api/drivers';

const getAuthToken = () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Authentication required');
    return token;
};

const AdminDrivers = () => {
    const [drivers, setDrivers] = useState([]);
    const [form, setForm] = useState({
        name: '', licenseNumber: '', phoneNumber: '', gender: '', language: '',
        experience: '', inValleyPrice: '', outValleyPrice: '', image: null
    });

    const [formErrors, setFormErrors] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [loadingToggle, setLoadingToggle] = useState(null);

    useEffect(() => {
        fetchDrivers();
    }, []);

    const fetchDrivers = async () => {
        try {
            const res = await axios.get(API_BASE, {
                headers: { Authorization: `Bearer ${getAuthToken()}` }
            });
            setDrivers(res.data.drivers);
        } catch {
            toast.error('Failed to fetch drivers');
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setForm(prev => ({ ...prev, [name]: files ? files[0] : value }));
        if (formErrors[name]) setFormErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validateForm = () => {
        const errors = {};
        if (!form.name) errors.name = 'Required';
        if (!form.licenseNumber) errors.licenseNumber = 'Required';
        if (!form.phoneNumber) errors.phoneNumber = 'Required';
        if (!form.gender) errors.gender = 'Required';
        if (!form.image && !isEditing) errors.image = 'Image required';
        if (!form.experience || isNaN(form.experience)) errors.experience = 'Invalid';
        if (!form.inValleyPrice || isNaN(form.inValleyPrice)) errors.inValleyPrice = 'Invalid';
        if (!form.outValleyPrice || isNaN(form.outValleyPrice)) errors.outValleyPrice = 'Invalid';
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const token = getAuthToken();
            const formData = new FormData();

            // Add all form fields to FormData
            formData.append('name', form.name);
            formData.append('licenseNumber', form.licenseNumber);
            formData.append('phoneNumber', form.phoneNumber);
            formData.append('gender', form.gender);
            formData.append('experience', form.experience.toString());
            formData.append('inValleyPrice', form.inValleyPrice.toString());
            formData.append('outValleyPrice', form.outValleyPrice.toString());

            if (form.language && form.language.trim()) {
                formData.append('language', form.language);
            }

            if (form.image) {
                formData.append('image', form.image);
            }

            const url = isEditing ? `${API_BASE}/${editingId}` : API_BASE;
            const method = isEditing ? 'put' : 'post';

            const response = await axios({
                method,
                url,
                data: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                toast.success(`Driver ${isEditing ? 'updated' : 'added'}!`);
                fetchDrivers();
                resetForm();
            }
        } catch (err) {
            console.error('Error submitting form:', err);
            toast.error(err.response?.data?.message || 'Submit failed');
        }
    };

    const handleEdit = (driver) => {
        setForm({
            name: driver.name,
            licenseNumber: driver.licenseNumber,
            phoneNumber: driver.phoneNumber,
            gender: driver.gender,
            language: Array.isArray(driver.language) ? driver.language.join(', ') : driver.language || '',
            experience: driver.experience,
            inValleyPrice: driver.inValleyPrice,
            outValleyPrice: driver.outValleyPrice,
            image: null
        });
        setEditingId(driver._id);
        setIsEditing(true);
        setShowForm(true);
    };

    // SEPARATE function for toggling availability
    const toggleAvailability = async (driverId, currentStatus) => {
        setLoadingToggle(driverId);
        try {
            const token = getAuthToken();

            // Use the dedicated toggle endpoint
            const response = await axios.put(`${API_BASE}/${driverId}/toggle-status`,
                { isAvailable: !currentStatus },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data.success) {
                toast.success(`Driver ${!currentStatus ? 'marked as available' : 'marked as unavailable'}!`);
                fetchDrivers();
            }
        } catch (err) {
            console.error('Error toggling availability:', err);
            toast.error(err.response?.data?.message || 'Failed to update availability');
        } finally {
            setLoadingToggle(null);
        }
    };

    const confirmDelete = (id) => {
        setDeleteId(id);
    };

    const handleDeleteConfirmed = async () => {
        try {
            await axios.delete(`${API_BASE}/${deleteId}`, {
                headers: { Authorization: `Bearer ${getAuthToken()}` }
            });
            toast.success('Deleted successfully');
            fetchDrivers();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Delete failed');
        }
        setDeleteId(null);
    };

    const handleDeleteCancel = () => setDeleteId(null);

    const resetForm = () => {
        setForm({
            name: '', licenseNumber: '', phoneNumber: '', gender: '', language: '',
            experience: '', inValleyPrice: '', outValleyPrice: '', image: null
        });
        setEditingId(null);
        setIsEditing(false);
        setShowForm(false);
        setFormErrors({});
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                style={{ zIndex: 9999 }}
            />

            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold">Driver Management</h2>
                    <p className="text-gray-600 mt-1">Manage all drivers and their availability status</p>
                </div>
                <button
                    onClick={() => { resetForm(); setShowForm(true); }}
                    className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 flex items-center transition-colors"
                >
                    <FaPlus className="mr-2" /> Add Driver
                </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photo</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">License</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (In/Out Valley)</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {drivers.map(driver => (
                                <tr key={driver._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {driver.image ? (
                                            <img
                                                src={`http://localhost:3000${driver.image}`}
                                                alt="Driver"
                                                className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                                <span className="text-gray-400 text-xs">No Image</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{driver.name}</div>
                                        <div className="text-sm text-gray-500">
                                            Languages: {Array.isArray(driver.language) ? driver.language.join(', ') : driver.language || 'N/A'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{driver.licenseNumber}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{driver.phoneNumber}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{driver.experience} years</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <div>In: Rs. {driver.inValleyPrice}</div>
                                        <div>Out: Rs. {driver.outValleyPrice}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="flex items-center justify-center space-x-2">
                                            {/* Availability Toggle */}
                                            <button
                                                onClick={() => toggleAvailability(driver._id, driver.isAvailable)}
                                                disabled={loadingToggle === driver._id}
                                                className={`p-2 rounded-full transition-colors ${driver.isAvailable
                                                    ? 'text-green-600 hover:bg-green-100'
                                                    : 'text-red-600 hover:bg-red-100'
                                                    } ${loadingToggle === driver._id ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                title={driver.isAvailable ? 'Click to mark as Unavailable' : 'Click to mark as Available'}
                                            >
                                                {loadingToggle === driver._id ? (
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                                                ) : driver.isAvailable ? (
                                                    <FaToggleOn className="text-lg" />
                                                ) : (
                                                    <FaToggleOff className="text-lg" />
                                                )}
                                            </button>

                                            {/* Edit Button */}
                                            <button
                                                onClick={() => handleEdit(driver)}
                                                className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                                                title="Edit Driver"
                                            >
                                                <FaEdit />
                                            </button>

                                            {/* Delete Button */}
                                            <button
                                                onClick={() => confirmDelete(driver._id)}
                                                className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                                                title="Delete Driver"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {drivers.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-lg mb-2">No drivers found</div>
                        <p className="text-gray-500">Add your first driver to get started</p>
                    </div>
                )}
            </div>

            {/* Delete confirmation modal */}
            {deleteId && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl text-center w-full max-w-md">
                        <div className="mb-4">
                            <FaTrash className="mx-auto text-red-500 text-3xl mb-3" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Driver</h3>
                            <p className="text-gray-600">Are you sure you want to delete this driver? This action cannot be undone.</p>
                        </div>
                        <div className="flex justify-center gap-3">
                            <button
                                className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                                onClick={handleDeleteConfirmed}
                            >
                                Delete
                            </button>
                            <button
                                className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
                                onClick={handleDeleteCancel}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Form modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl">
                        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                            <h3 className="text-xl font-semibold text-gray-900">
                                {isEditing ? 'Edit Driver' : 'Add New Driver'}
                            </h3>
                            <button
                                onClick={resetForm}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <FaTimes className="text-xl" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { name: 'name', label: 'Full Name', required: true },
                                    { name: 'licenseNumber', label: 'License Number', required: true },
                                    { name: 'phoneNumber', label: 'Phone Number', required: true },
                                    { name: 'language', label: 'Languages (comma-separated)', required: false },
                                    { name: 'experience', label: 'Experience (Years)', type: 'number', required: true },
                                    { name: 'inValleyPrice', label: 'Price (In Valley)', type: 'number', required: true },
                                    { name: 'outValleyPrice', label: 'Price (Out Valley)', type: 'number', required: true }
                                ].map(field => (
                                    <div key={field.name}>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {field.label}
                                            {field.required && <span className="text-red-500 ml-1">*</span>}
                                        </label>
                                        <input
                                            type={field.type || 'text'}
                                            name={field.name}
                                            value={form[field.name]}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                        />
                                        {formErrors[field.name] && (
                                            <p className="text-red-500 text-sm mt-1">{formErrors[field.name]}</p>
                                        )}
                                    </div>
                                ))}

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Gender <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="gender"
                                        value={form.gender}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    {formErrors.gender && <p className="text-red-500 text-sm mt-1">{formErrors.gender}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Driver Image {!isEditing && <span className="text-red-500">*</span>}
                                    </label>
                                    <input
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                    />
                                    {formErrors.image && <p className="text-red-500 text-sm mt-1">{formErrors.image}</p>}
                                </div>
                            </div>

                            <div className="flex justify-end mt-8 space-x-3">
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                                >
                                    {isEditing ? 'Update Driver' : 'Add Driver'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDrivers;