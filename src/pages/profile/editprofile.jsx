// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const EditProfile = () => {
//     const [formData, setFormData] = useState({
//         fullName: '',
//         address: '',
//         phone: '',
//         email: '',
//         profileImage: '',
//     });
//     const [preview, setPreview] = useState(null);
//     const [imageFile, setImageFile] = useState(null);
//     const token = localStorage.getItem('token');
//     const navigate = useNavigate();

//     useEffect(() => {
//         fetchProfile();
//     }, []);

//     const fetchProfile = async () => {
//         try {
//             const { data } = await axios.get('http://localhost:3000/api/profile', {
//                 headers: { Authorization: `Bearer ${token}` },
//             });

//             setFormData({
//                 fullName: data.user.fullName,
//                 address: data.user.address,
//                 phone: data.user.phone,
//                 email: data.user.email,
//                 profileImage: data.user.profileImage,
//             });

//             setPreview(`http://localhost:3000${data.user.profileImage || ''}`);
//         } catch (err) {
//             toast.error('Failed to load profile');
//         }
//     };

//     const handleChange = (e) => {
//         setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//     };

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         setImageFile(file);
//         setPreview(URL.createObjectURL(file));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const updatedData = new FormData();
//         updatedData.append('fullName', formData.fullName);
//         updatedData.append('address', formData.address);
//         updatedData.append('phone', formData.phone);
//         if (imageFile) {
//             updatedData.append('profileImage', imageFile);
//         }

//         try {
//             await axios.put('http://localhost:3000/api/profile', updatedData, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });

//             toast.success('Profile updated');
//             navigate('/profile'); // redirect back
//         } catch (err) {
//             toast.error('Update failed');
//         }
//     };

//     return (
//         <div className="max-w-xl mx-auto mt-10 bg-white shadow p-6 rounded">
//             <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <div className="flex flex-col items-center">
//                     <img
//                         src={preview || '/default.png'}
//                         alt="Preview"
//                         className="w-24 h-24 rounded-full object-cover border mb-2"
//                     />
//                     <input type="file" onChange={handleImageChange} />
//                 </div>

//                 <input
//                     type="text"
//                     name="fullName"
//                     value={formData.fullName}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-2 border rounded"
//                     placeholder="Full Name"
//                 />

//                 <input
//                     type="text"
//                     name="address"
//                     value={formData.address}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-2 border rounded"
//                     placeholder="Address"
//                 />

//                 <input
//                     type="text"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-2 border rounded"
//                     placeholder="Phone"
//                 />

//                 <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     disabled
//                     className="w-full px-4 py-2 border rounded bg-gray-100 cursor-not-allowed"
//                     placeholder="Email (read-only)"
//                 />

//                 <button
//                     type="submit"
//                     className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//                 >
//                     Update Profile
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default EditProfile;








import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../../components/Navbar';
const EditProfile = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        address: '',
        phone: '',
        email: '',
        profileImage: '',
    });

    const [preview, setPreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/api/profile', {
                headers: { Authorization: `Bearer ${token}` },
            });

            setFormData({
                fullName: data.user.fullName || '',
                address: data.user.address || '',
                phone: data.user.phone || '',
                email: data.user.email || '',
                profileImage: data.user.profileImage || '',
            });

            setPreview(`http://localhost:3000${data.user.profileImage}`);
        } catch (err) {
            toast.error('Failed to load profile');
        }
    };

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImageFile(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedData = new FormData();
        updatedData.append('fullName', formData.fullName);
        updatedData.append('address', formData.address);
        updatedData.append('phone', formData.phone);
        if (imageFile) updatedData.append('profileImage', imageFile);

        try {
            await axios.put('http://localhost:3000/api/profile', updatedData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            toast.success('Profile updated successfully');
            navigate('/profile');
        } catch (err) {
            toast.error('Profile update failed');
        }
    };

    return (
        <>  <Navbar />
            <div className="max-w-4xl mx-auto mt-10 bg-white border rounded-lg shadow p-8 font-sans">
                <h2 className="text-2xl font-semibold mb-6">Edit Profile</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {/* Profile Image + Upload */}
                    <div className="flex flex-col items-center">
                        <img
                            src={preview || '/default.png'}
                            alt="Profile Preview"
                            className="w-32 h-32 rounded-full object-cover border mb-4"
                        />
                        <label className="cursor-pointer px-4 py-2 bg-gray-200 rounded shadow hover:bg-gray-300 text-sm text-center">
                            Upload New Photo
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </label>
                    </div>

                    {/* Editable Fields */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                                className="w-full border rounded px-4 py-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                                className="w-full border rounded px-4 py-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Contact Number</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full border rounded px-4 py-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                disabled
                                className="w-full border rounded px-4 py-2 bg-gray-100 cursor-not-allowed"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex space-x-4 mt-4">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/profile')}
                                className="px-6 py-2 border rounded hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditProfile;
