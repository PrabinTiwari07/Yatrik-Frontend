// import { useState } from "react";
// import { FiEdit2 } from "react-icons/fi";

// const Profile = ({ user }) => {
//   // Example user prop fallback
//   const defaultUser = {
//     fullName: "John Doe",
//     email: "john@example.com",
//     phone: "+977-9800000000",
//     address: "Kathmandu, Nepal",
//     avatar: "/assets/avatar.png",
//   };
//   const [editMode, setEditMode] = useState(false);
//   const [profile, setProfile] = useState(user || defaultUser);

//   const handleChange = (e) => {
//     setProfile({ ...profile, [e.target.name]: e.target.value });
//   };

//   const handleSave = () => {
//     setEditMode(false);
//     // TODO: Save profile to backend here
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
//       <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
//         <div className="flex flex-col items-center">
//           <img
//             src={profile.avatar}
//             alt="Profile"
//             className="w-28 h-28 rounded-full border-4 border-blue-200 object-cover mb-4"
//           />
//           <h2 className="text-2xl font-bold text-gray-800 mb-1">{profile.fullName}</h2>
//           <p className="text-gray-500 mb-4">{profile.email}</p>
//           <button
//             onClick={() => setEditMode((v) => !v)}
//             className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition mb-6"
//           >
//             <FiEdit2 /> {editMode ? "Cancel" : "Edit Profile"}
//           </button>
//         </div>
//         <div className="space-y-4">
//           <div>
//             <label className="block text-gray-600 text-sm mb-1">Full Name</label>
//             <input
//               type="text"
//               name="fullName"
//               value={profile.fullName}
//               onChange={handleChange}
//               readOnly={!editMode}
//               className={`w-full p-3 rounded-lg border ${editMode ? "border-blue-300 bg-white" : "border-gray-200 bg-gray-100"} focus:outline-none`}
//             />
//           </div>
//           <div>
//             <label className="block text-gray-600 text-sm mb-1">Phone</label>
//             <input
//               type="text"
//               name="phone"
//               value={profile.phone}
//               onChange={handleChange}
//               readOnly={!editMode}
//               className={`w-full p-3 rounded-lg border ${editMode ? "border-blue-300 bg-white" : "border-gray-200 bg-gray-100"} focus:outline-none`}
//             />
//           </div>
//           <div>
//             <label className="block text-gray-600 text-sm mb-1">Address</label>
//             <input
//               type="text"
//               name="address"
//               value={profile.address}
//               onChange={handleChange}
//               readOnly={!editMode}
//               className={`w-full p-3 rounded-lg border ${editMode ? "border-blue-300 bg-white" : "border-gray-200 bg-gray-100"} focus:outline-none`}
//             />
//           </div>
//           <div>
//             <label className="block text-gray-600 text-sm mb-1">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={profile.email}
//               readOnly
//               className="w-full p-3 rounded-lg border border-gray-200 bg-gray-100 cursor-not-allowed"
//             />
//           </div>
//         </div>
//         {editMode && (
//           <button
//             onClick={handleSave}
//             className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
//           >
//             Save Changes
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;