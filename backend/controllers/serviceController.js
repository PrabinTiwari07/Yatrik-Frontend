const Service = require('../model/service');

// ADMIN: Create Service
exports.createService = async (req, res) => {
    try {
        const service = new Service(req.body);
        await service.save();
        res.status(201).json({ success: true, service });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// ADMIN: Update Service
exports.updateService = async (req, res) => {
    try {
        const {
            name,
            description,
            category,
            image,
            seats,
            luggage,
            doors,
            transmission,
            fuelType,
            airConditioning,
            price
        } = req.body;

        const updatedService = await Service.findByIdAndUpdate(
            req.params.id,
            {
                name,
                description,
                category,
                image,
                seats,
                luggage,
                doors,
                transmission,
                fuelType,
                airConditioning,
                price
            },
            { new: true, runValidators: true }
        );

        if (!updatedService) {
            return res.status(404).json({ message: 'Service not found' });
        }

        res.json({ success: true, service: updatedService });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ADMIN: Delete Service
exports.deleteService = async (req, res) => {
    try {
        const deletedService = await Service.findByIdAndDelete(req.params.id);
        if (!deletedService) {
            return res.status(404).json({ message: 'Service not found' });
        }

        res.json({ success: true, message: 'Service deleted successfully.' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// PUBLIC (USER): Get All Services
exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.json({ success: true, services });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// PUBLIC (USER): Get Single Service
exports.getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ message: 'Service not found' });
        res.json({ success: true, service });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
