const VehicleBooking = require('../model/vehicleBooking');
const Service = require('../model/service');
const User = require('../model/user');

// Create a new vehicle rental booking
exports.createVehicleBooking = async (req, res) => {
    try {
        const userId = req.user.id; // From auth middleware

        const {
            vehicle,
            vehicleName,
            pickupLocation,
            dropoffLocation,
            pickupCoords,
            dropoffCoords,
            pickupDate,
            dropoffDate,
            pickupTime,
            dropoffTime,
            totalDays,
            includeDriver,
            rentalType,
            totalPrice,
            paymentMethod,
            paymentStatus,
            paymentInfo,
            status,
            notes
        } = req.body;

        // Validate required fields
        if (!vehicle || !vehicleName || !pickupLocation || !dropoffLocation ||
            !pickupDate || !dropoffDate || !pickupTime || !dropoffTime ||
            !totalDays || !totalPrice || !paymentMethod || !rentalType) {
            return res.status(400).json({
                success: false,
                message: 'All required fields must be provided'
            });
        }

        // Verify vehicle exists
        const vehicleExists = await Service.findById(vehicle);
        if (!vehicleExists) {
            return res.status(404).json({
                success: false,
                message: 'Vehicle not found'
            });
        }

        // Create booking
        const booking = new VehicleBooking({
            user: userId,
            vehicle,
            vehicleName,
            pickupLocation,
            dropoffLocation,
            pickupCoords,
            dropoffCoords,
            pickupDate,
            dropoffDate,
            pickupTime,
            dropoffTime,
            totalDays,
            includeDriver: includeDriver || false,
            rentalType,
            totalPrice,
            paymentMethod,
            paymentStatus: paymentStatus || 'pending',
            paymentInfo: paymentInfo || null,
            status: status || 'pending',
            notes: notes || ''
        });

        await booking.save();

        // Populate vehicle details for response
        await booking.populate('vehicle', 'name category image price');
        await booking.populate('user', 'firstName lastName email phone');

        console.log('✅ Vehicle booking created successfully:', booking._id);

        res.status(201).json({
            success: true,
            message: 'Vehicle booking created successfully',
            booking
        });

    } catch (error) {
        console.error('❌ Error creating vehicle booking:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create booking',
            error: error.message
        });
    }
};

// Get all bookings for a user
exports.getUserVehicleBookings = async (req, res) => {
    try {
        const userId = req.user.id;

        const bookings = await VehicleBooking.find({ user: userId })
            .populate('vehicle', 'name category image price seats doors transmission fuelType')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: bookings.length,
            bookings
        });

    } catch (error) {
        console.error('❌ Error fetching user vehicle bookings:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch bookings',
            error: error.message
        });
    }
};

// Get a specific booking by ID
exports.getVehicleBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const booking = await VehicleBooking.findOne({ _id: id, user: userId })
            .populate('vehicle', 'name category image price seats doors transmission fuelType')
            .populate('user', 'firstName lastName email phone');

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        res.status(200).json({
            success: true,
            booking
        });

    } catch (error) {
        console.error('❌ Error fetching vehicle booking:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch booking',
            error: error.message
        });
    }
};

// Update booking status (user can cancel, admin can update)
exports.updateVehicleBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const { status, paymentStatus, paymentInfo, notes } = req.body;

        // Find booking
        const booking = await VehicleBooking.findOne({ _id: id, user: userId });
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        // Update allowed fields
        if (status) booking.status = status;
        if (paymentStatus) booking.paymentStatus = paymentStatus;
        if (paymentInfo) booking.paymentInfo = { ...booking.paymentInfo, ...paymentInfo };
        if (notes) booking.notes = notes;

        await booking.save();

        // Populate for response
        await booking.populate('vehicle', 'name category image price');
        await booking.populate('user', 'firstName lastName email phone');

        console.log('✅ Vehicle booking updated successfully:', booking._id);

        res.status(200).json({
            success: true,
            message: 'Booking updated successfully',
            booking
        });

    } catch (error) {
        console.error('❌ Error updating vehicle booking:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update booking',
            error: error.message
        });
    }
};

// Cancel a booking
exports.cancelVehicleBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const booking = await VehicleBooking.findOne({ _id: id, user: userId });
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        // Check if booking can be cancelled
        if (booking.status === 'cancelled') {
            return res.status(400).json({
                success: false,
                message: 'Booking is already cancelled'
            });
        }

        if (booking.status === 'completed') {
            return res.status(400).json({
                success: false,
                message: 'Cannot cancel completed booking'
            });
        }

        booking.status = 'cancelled';
        await booking.save();

        console.log('✅ Vehicle booking cancelled successfully:', booking._id);

        res.status(200).json({
            success: true,
            message: 'Booking cancelled successfully',
            booking
        });

    } catch (error) {
        console.error('❌ Error cancelling vehicle booking:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to cancel booking',
            error: error.message
        });
    }
};

// ADMIN: Get all vehicle bookings
exports.getAllVehicleBookings = async (req, res) => {
    try {
        const { status, paymentStatus, page = 1, limit = 10 } = req.query;

        // Build filter object
        const filter = {};
        if (status) filter.status = status;
        if (paymentStatus) filter.paymentStatus = paymentStatus;

        // Calculate pagination
        const skip = (page - 1) * limit;

        const bookings = await VehicleBooking.find(filter)
            .populate('vehicle', 'name category image price seats doors transmission fuelType')
            .populate('user', 'firstName lastName email phone')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await VehicleBooking.countDocuments(filter);

        res.status(200).json({
            success: true,
            count: bookings.length,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: parseInt(page),
            bookings
        });

    } catch (error) {
        console.error('❌ Error fetching all vehicle bookings:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch bookings',
            error: error.message
        });
    }
};

// ADMIN: Update any booking
exports.adminUpdateVehicleBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const booking = await VehicleBooking.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).populate('vehicle', 'name category image price')
            .populate('user', 'firstName lastName email phone');

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        console.log('✅ Vehicle booking updated by admin:', booking._id);

        res.status(200).json({
            success: true,
            message: 'Booking updated successfully',
            booking
        });

    } catch (error) {
        console.error('❌ Error updating vehicle booking (admin):', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update booking',
            error: error.message
        });
    }
};

// ADMIN: Delete a booking
exports.deleteVehicleBooking = async (req, res) => {
    try {
        const { id } = req.params;

        const booking = await VehicleBooking.findByIdAndDelete(id);
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        console.log('✅ Vehicle booking deleted by admin:', id);

        res.status(200).json({
            success: true,
            message: 'Booking deleted successfully'
        });

    } catch (error) {
        console.error('❌ Error deleting vehicle booking:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete booking',
            error: error.message
        });
    }
};

// Get booking statistics (for dashboard)
exports.getVehicleBookingStats = async (req, res) => {
    try {
        const stats = await VehicleBooking.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 },
                    totalRevenue: { $sum: '$totalPrice' }
                }
            }
        ]);

        const paymentStats = await VehicleBooking.aggregate([
            {
                $group: {
                    _id: '$paymentStatus',
                    count: { $sum: 1 },
                    totalAmount: { $sum: '$totalPrice' }
                }
            }
        ]);

        const monthlyStats = await VehicleBooking.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: '$createdAt' },
                        month: { $month: '$createdAt' }
                    },
                    count: { $sum: 1 },
                    revenue: { $sum: '$totalPrice' }
                }
            },
            {
                $sort: { '_id.year': -1, '_id.month': -1 }
            },
            {
                $limit: 12
            }
        ]);

        res.status(200).json({
            success: true,
            stats: {
                byStatus: stats,
                byPaymentStatus: paymentStats,
                monthly: monthlyStats
            }
        });

    } catch (error) {
        console.error('❌ Error fetching vehicle booking stats:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch stats',
            error: error.message
        });
    }
};
