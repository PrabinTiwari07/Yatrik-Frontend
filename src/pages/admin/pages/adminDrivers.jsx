import axios from 'axios';
import { useEffect, useState } from 'react';
import {
    FaEdit, FaPlus, FaTimes, FaTrash
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
        name: '', licenseNumber: '', gender: '', language: '',
        experience: '', inValleyPrice: '', outValleyPrice: '', image: null
    });

    const [formErrors, setFormErrors] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

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
            Object.entries(form).forEach(([key, value]) => {
                if (value) formData.append(key, value);
            });

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
            toast.error(err.response?.data?.message || 'Submit failed');
        }
    };

    const handleEdit = (driver) => {
        setForm({
            name: driver.name,
            licenseNumber: driver.licenseNumber,
            gender: driver.gender,
            language: driver.language.join(', '),
            experience: driver.experience,
            inValleyPrice: driver.inValleyPrice,
            outValleyPrice: driver.outValleyPrice,
            image: null
        });
        setEditingId(driver._id);
        setIsEditing(true);
        setShowForm(true);
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
            name: '', licenseNumber: '', gender: '', language: '',
            experience: '', inValleyPrice: '', outValleyPrice: '', image: null
        });
        setEditingId(null);
        setIsEditing(false);
        setShowForm(false);
        setFormErrors({});
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <ToastContainer />
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Driver Management</h2>
                <button
                    onClick={() => { resetForm(); setShowForm(true); }}
                    className="bg-black text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
                >
                    <FaPlus className="mr-2" /> Add Driver
                </button>
            </div>

            <div className="overflow-x-auto bg-white rounded shadow">
                <table className="min-w-full">
                    <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="p-3">Photo</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">License</th>
                            <th className="p-3">Gender</th>
                            <th className="p-3">Experience</th>
                            <th className="p-3">Price (In Valley)</th>
                            <th className="p-3">Price (Out Valley)</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {drivers.map(driver => (
                            <tr key={driver._id} className="border-t hover:bg-gray-50">
                                <td className="p-3">
                                    {driver.image
                                        ? <img src={`http://localhost:3000${driver.image}`} alt="Driver" className="w-12 h-12 rounded-full object-cover" />
                                        : <span>–</span>}
                                </td>
                                <td className="p-3">{driver.name}</td>
                                <td className="p-3">{driver.licenseNumber}</td>
                                <td className="p-3">{driver.gender}</td>
                                <td className="p-3">{driver.experience} yrs</td>
                                <td className="p-3">Rs. {driver.inValleyPrice}</td>
                                <td className="p-3">Rs. {driver.outValleyPrice}</td>
                                <td className="p-3 text-center space-x-2">
                                    <button onClick={() => handleEdit(driver)} className="text-blue-600"><FaEdit /></button>
                                    <button onClick={() => confirmDelete(driver._id)} className="text-red-600"><FaTrash /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Delete confirmation modal */}
            {deleteId && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center w-full max-w-sm">
                        <p className="mb-4 text-lg font-medium">Do you really want to delete this driver?</p>
                        <div className="flex justify-center gap-4">
                            <button
                                className="px-6 py-2 bg-green-100 text-green-700 border border-green-500 rounded hover:bg-green-200"
                                onClick={handleDeleteConfirmed}
                            >
                                Yes
                            </button>
                            <button
                                className="px-6 py-2 bg-red-100 text-red-700 border border-red-500 rounded hover:bg-red-200"
                                onClick={handleDeleteCancel}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Form modal (same as before) */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-2xl shadow relative">
                        <button
                            onClick={resetForm}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                        >
                            <FaTimes />
                        </button>
                        <h3 className="text-xl font-semibold mb-4">{isEditing ? 'Edit' : 'Add'} Driver</h3>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[{ name: 'name', label: 'Full Name' },
                            { name: 'licenseNumber', label: 'License Number' },
                            { name: 'language', label: 'Languages (comma-separated)' },
                            { name: 'experience', label: 'Experience (Years)', type: 'number' },
                            { name: 'inValleyPrice', label: 'Price (In Valley)', type: 'number' },
                            { name: 'outValleyPrice', label: 'Price (Out Valley)', type: 'number' }
                            ].map(field => (
                                <div key={field.name}>
                                    <label className="block mb-1 text-sm">{field.label}</label>
                                    <input
                                        type={field.type || 'text'}
                                        name={field.name}
                                        value={form[field.name]}
                                        onChange={handleChange}
                                        className="w-full border px-3 py-2 rounded"
                                    />
                                    {formErrors[field.name] && <p className="text-red-500 text-sm">{formErrors[field.name]}</p>}
                                </div>
                            ))}

                            <div>
                                <label className="block mb-1 text-sm">Gender</label>
                                <select name="gender" value={form.gender} onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded">
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                {formErrors.gender && <p className="text-red-500 text-sm">{formErrors.gender}</p>}
                            </div>

                            <div>
                                <label className="block mb-1 text-sm">Driver Image</label>
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded"
                                />
                                {formErrors.image && <p className="text-red-500 text-sm">{formErrors.image}</p>}
                            </div>

                            <div className="col-span-2 flex justify-end mt-4 space-x-3">
                                <button type="button" onClick={resetForm} className="bg-gray-300 px-4 py-2 rounded">
                                    Cancel
                                </button>
                                <button type="submit" className="bg-black text-white px-6 py-2 rounded hover:bg-blue-700">
                                    {isEditing ? 'Update' : 'Add'} Driver
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
