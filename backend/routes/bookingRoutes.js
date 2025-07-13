const express = require('express');
const router = express.Router();
const vehicleBookingController = require('../controllers/vehicleBookingController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// User routes (protected)
router.use(protect); // All routes require authentication

// Create a new vehicle booking
router.post('/vehicle-rental', vehicleBookingController.createVehicleBooking);

// Get user's vehicle bookings
router.get('/user/vehicle-rentals', vehicleBookingController.getUserVehicleBookings);

// Get specific booking by ID
router.get('/vehicle-rental/:id', vehicleBookingController.getVehicleBookingById);

// Update booking (user can update limited fields)
router.put('/vehicle-rental/:id', vehicleBookingController.updateVehicleBooking);

// Cancel booking
router.patch('/vehicle-rental/:id/cancel', vehicleBookingController.cancelVehicleBooking);

// Admin routes (protected + admin only)
router.use(adminOnly); // All routes below require admin access

// Get all vehicle bookings (admin)
router.get('/admin/vehicle-rentals', vehicleBookingController.getAllVehicleBookings);

// Update any booking (admin)
router.put('/admin/vehicle-rental/:id', vehicleBookingController.adminUpdateVehicleBooking);

// Delete booking (admin)
router.delete('/admin/vehicle-rental/:id', vehicleBookingController.deleteVehicleBooking);

// Get booking statistics (admin)
router.get('/admin/vehicle-rental-stats', vehicleBookingController.getVehicleBookingStats);

module.exports = router;
