// const express = require('express');
// const router = express.Router();
// const serviceController = require('../controllers/serviceController');
// const { protect, adminOnly } = require('../middleware/authMiddleware');

// // Public routes
// router.get('/', serviceController.getAllServices);
// router.get('/:id', serviceController.getServiceById);

// // Admin routes
// router.post('/', protect, adminOnly, serviceController.createService);
// router.put('/:id', protect, adminOnly, serviceController.updateService);
// router.delete('/:id', protect, adminOnly, serviceController.deleteService);

// module.exports = router;
