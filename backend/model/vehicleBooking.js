const mongoose = require('mongoose');

const vehicleBookingSchema = new mongoose.Schema({
    // User information
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    // Vehicle information
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    vehicleName: {
        type: String,
        required: true
    },

    // Location details
    pickupLocation: {
        type: String,
        required: true
    },
    dropoffLocation: {
        type: String,
        required: true
    },
    pickupCoords: {
        lat: Number,
        lng: Number
    },
    dropoffCoords: {
        lat: Number,
        lng: Number
    },

    // Date and time details
    pickupDate: {
        type: String,
        required: true
    },
    dropoffDate: {
        type: String,
        required: true
    },
    pickupTime: {
        type: String,
        required: true
    },
    dropoffTime: {
        type: String,
        required: true
    },
    totalDays: {
        type: Number,
        required: true
    },

    // Rental details
    includeDriver: {
        type: Boolean,
        default: false
    },
    rentalType: {
        type: String,
        enum: ['self-drive', 'with-driver'],
        required: true
    },

    // Pricing
    totalPrice: {
        type: Number,
        required: true
    },

    // Payment information
    paymentMethod: {
        type: String,
        enum: ['khalti', 'cash', 'online'],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed', 'refunded'],
        default: 'pending'
    },
    paymentInfo: {
        pidx: String,
        transactionId: String,
        amount: Number,
        status: String,
        paidAt: Date
    },

    // Booking status
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'ongoing', 'completed', 'cancelled'],
        default: 'pending'
    },

    // Additional details
    bookingDate: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: String
    }
}, {
    timestamps: true
});

// Add indexes for better query performance
vehicleBookingSchema.index({ user: 1 });
vehicleBookingSchema.index({ vehicle: 1 });
vehicleBookingSchema.index({ status: 1 });
vehicleBookingSchema.index({ paymentStatus: 1 });
vehicleBookingSchema.index({ bookingDate: -1 });

module.exports = mongoose.model('VehicleBooking', vehicleBookingSchema);
