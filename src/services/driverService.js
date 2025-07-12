import axios from 'axios';

const API_URL = 'http://localhost:5000/api/drivers';

// Get all drivers
export const getDrivers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data.drivers;
};

// Add a new driver
export const addDriver = async (driverData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, driverData, config);
  return response.data.driver;
};

// Update a driver
export const updateDriver = async (id, driverData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL}/${id}`, driverData, config);
  return response.data.driver;
};

// Delete a driver
export const deleteDriver = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  await axios.delete(`${API_URL}/${id}`, config);
  return id;
};
