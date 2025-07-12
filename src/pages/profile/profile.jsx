import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import Footer from '../../components/footer';
import Navbar from '../../components/Navbar';
const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    <>
      <Navbar /> {/* ✅ OUTSIDE the profile card */}

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
            onClick={() => navigate('/edit-profile')}
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
      {/* <Footer /> */}


    </>
  );
};

export default Profile;
