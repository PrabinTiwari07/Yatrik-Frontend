// // import { useEffect, useState } from "react";
// // import { FaStar } from "react-icons/fa";
// // import { FiEdit2 } from "react-icons/fi";

// // const Profile = () => {
// //   const [profile, setProfile] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   const fetchProfile = async () => {
// //     const token = localStorage.getItem('token');
// //     try {
// //       const res = await fetch('http://localhost:3000/api/profile', {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });

// //       const data = await res.json();

// //       if (!res.ok) throw new Error(data.message || "Failed to fetch");

// //       setProfile(data);
// //     } catch (error) {
// //       console.error("Error fetching profile:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchProfile();
// //   }, []);

// //   if (loading) return <div className="p-10 text-center">Loading...</div>;
// //   if (!profile) return <div className="p-10 text-center">Profile not found</div>;

// //   const user = profile.user;
// //   const profileInfo = profile.profile;

// //   return (
// //     <div className="min-h-screen bg-gray-100 flex flex-col items-center py-6 px-2">
// //       <div className="w-full max-w-4xl bg-white rounded-2xl shadow flex flex-col">
// //         <div className="flex flex-col md:flex-row items-center md:items-start gap-6 px-8 py-8">
// //           <div className="flex flex-col items-center md:items-start gap-2">
// //             <img
// //               src={user.avatar || '/assets/avatar.png'}
// //               alt="Profile"
// //               className="w-24 h-24 rounded-full border-4 border-blue-200 object-cover"
// //             />
// //             <div className="flex items-center gap-2 mt-2">
// //               <span className="text-xl font-semibold">{user.fullName || 'Unknown'}</span>
// //               <span className="flex items-center text-yellow-500 ml-2">
// //                 <FaStar className="mr-1" /> 4.3
// //               </span>
// //             </div>
// //             <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold mt-1">
// //               {user.role || 'Traveler'}
// //             </span>
// //           </div>
// //           <div className="flex-1 flex justify-end w-full md:w-auto">
// //             <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-300 text-gray-800 rounded-lg hover:bg-gray-200 transition">
// //               <FiEdit2 /> Edit Profile
// //             </button>
// //           </div>
// //         </div>

// //         <div className="border-t border-b border-gray-200 flex flex-col md:flex-row justify-between items-center px-8 py-4 gap-4">
// //           <div className="flex-1 text-center">
// //             <div className="text-gray-500 text-sm">Address</div>
// //             <div className="font-medium">{user.address || "N/A"}</div>
// //           </div>
// //           <div className="flex-1 text-center">
// //             <div className="text-gray-500 text-sm">Contact</div>
// //             <div className="font-medium">{user.phone || "N/A"}</div>
// //           </div>
// //           <div className="flex-1 text-center">
// //             <div className="text-gray-500 text-sm">Email</div>
// //             <div className="font-medium">{user.email || "N/A"}</div>
// //           </div>
// //         </div>

// //         <div className="px-8 py-6">
// //           <div className="bg-gray-50 rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 shadow-inner">
// //             <img
// //               src="/assets/license.jpg"
// //               alt="License"
// //               className="w-40 h-28 object-cover rounded-lg border"
// //             />
// //             <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
// //               <div>
// //                 <div className="text-gray-600 text-sm">Name:</div>
// //                 <div className="font-medium">{user.fullName || "N/A"}</div>
// //               </div>
// //               <div>
// //                 <div className="text-gray-600 text-sm">Number:</div>
// //                 <div className="font-medium">N/A</div>
// //               </div>
// //               <div>
// //                 <div className="text-gray-600 text-sm">Expiry date:</div>
// //                 <div className="font-medium">N/A</div>
// //               </div>
// //               <div>
// //                 <div className="text-gray-600 text-sm">Status:</div>
// //                 <div className="font-medium flex items-center gap-1">
// //                   Pending <span className="text-yellow-600 text-lg">⏳</span>
// //                 </div>
// //               </div>
// //             </div>
// //             <div className="flex flex-col justify-center items-center mt-4 md:mt-0">
// //               <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 font-semibold transition">
// //                 Update
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Profile;


// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';

// const Profile = () => {
//   const [user, setUser] = useState({});
//   const [profile, setProfile] = useState({});
//   const [preview, setPreview] = useState(null);
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const token = localStorage.getItem('token'); // adjust if using context/cookies

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       const { data } = await axios.get('http://localhost:3000/api/profile', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setUser(data.user);
//       setProfile(data.profile);
//       setPreview(data.profile.profileImage ? `http://localhost:3000${data.profile.profileImage}` : null);
//     } catch (error) {
//       toast.error('Failed to load profile');
//     }
//   };

//   const handleChange = (e) => {
//     setProfile({ ...profile, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImage(file);
//     setPreview(URL.createObjectURL(file));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData();
//     formData.append('bio', profile.bio || '');
//     formData.append('gender', profile.gender || 'Other');
//     formData.append('dob', profile.dob || '');
//     formData.append('address', user.address || '');
//     formData.append('phone', user.phone || '');
//     if (image) {
//       formData.append('profileImage', image);
//     }

//     try {
//       await axios.put('http://localhost:3000/api/profile', formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       toast.success('Profile updated successfully');
//       fetchProfile(); // refresh profile
//     } catch (error) {
//       toast.error('Profile update failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto p-4 bg-white rounded shadow mt-10">
//       <h2 className="text-2xl font-bold mb-4">My Profile</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">

//         {/* Profile image */}
//         <div className="flex flex-col items-center">
//           <img
//             src={preview || 'https://via.placeholder.com/100'}
//             alt="Profile"
//             className="w-24 h-24 rounded-full object-cover mb-2"
//           />
//           <input type="file" accept="image/*" onChange={handleImageChange} />
//         </div>

//         {/* Basic details */}
//         <input
//           type="text"
//           value={user.fullName || ''}
//           disabled
//           className="w-full border px-4 py-2 rounded"
//           placeholder="Full Name"
//         />

//         <input
//           type="email"
//           value={user.email || ''}
//           disabled
//           className="w-full border px-4 py-2 rounded"
//           placeholder="Email"
//         />

//         <input
//           type="text"
//           value={user.phone || ''}
//           onChange={(e) => setUser({ ...user, phone: e.target.value })}
//           className="w-full border px-4 py-2 rounded"
//           placeholder="Phone"
//           required
//         />

//         <input
//           type="text"
//           value={user.address || ''}
//           onChange={(e) => setUser({ ...user, address: e.target.value })}
//           className="w-full border px-4 py-2 rounded"
//           placeholder="Address"
//           required
//         />

//         {/* Extended profile */}
//         <textarea
//           name="bio"
//           value={profile.bio || ''}
//           onChange={handleChange}
//           className="w-full border px-4 py-2 rounded"
//           placeholder="Bio"
//         />

//         <select
//           name="gender"
//           value={profile.gender || 'Other'}
//           onChange={handleChange}
//           className="w-full border px-4 py-2 rounded"
//         >
//           <option>Male</option>
//           <option>Female</option>
//           <option>Other</option>
//         </select>

//         <input
//           type="date"
//           name="dob"
//           value={profile.dob ? profile.dob.substring(0, 10) : ''}
//           onChange={handleChange}
//           className="w-full border px-4 py-2 rounded"
//         />

//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
//         >
//           {loading ? 'Updating...' : 'Update Profile'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Profile;

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ import navigate
import { toast } from 'react-toastify';


const Profile = () => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // ✅ initialize

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/api/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(data.user);
    } catch (err) {
      toast.error('Error fetching profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading || !user) return <div className="p-4">Loading...</div>;

  return (

    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded mt-10 font-sans">


      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <img
            src={
              user.profileImage
                ? `http://localhost:3000${user.profileImage}`
                : '/default.png'
            }
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border"
          />

          <div>
            <h2 className="text-2xl font-bold">{user.fullName}</h2>
            <p className="text-yellow-600 text-lg">★ 4.3</p>
            <span className="text-sm border border-gray-400 px-2 py-1 rounded bg-gray-100">
              Traveler
            </span>
          </div>
        </div>
        <button
          onClick={() => navigate('/edit-profile')} // ✅ navigate to EditProfile page
          className="px-4 py-2 border rounded shadow hover:bg-gray-200"
        >
          Edit Profile
        </button>
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-3 text-center border-t border-b py-4 text-sm">
        <div>
          <p className="text-gray-500 font-medium">Address</p>
          <p>{user.address}</p>
        </div>
        <div>
          <p className="text-gray-500 font-medium">Contact</p>
          <p>{user.phone}</p>
        </div>
        <div>
          <p className="text-gray-500 font-medium">Email</p>
          <p>{user.email}</p>
        </div>
      </div>

      {/* License Section Placeholder */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">License</h3>
        <div className="flex items-center justify-center bg-gray-100 p-6 rounded h-40 text-gray-400 text-sm">
          License section coming soon...
        </div>
      </div>
    </div>
  );
};

export default Profile;
