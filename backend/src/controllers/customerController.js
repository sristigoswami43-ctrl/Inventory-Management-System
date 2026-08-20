const customerService = require("../services/customerService");

// Create Customer
exports.createCustomer = async (req, res) => {
    try {
        const customer = await customerService.createCustomer(req.body);

        res.status(201).json({
            success: true,
            message: "Customer created successfully",
            data: customer
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


// Get All Customers
exports.getCustomers = async (req, res) => {
    try {
        const customers = await customerService.getCustomers();

        res.status(200).json({
            success: true,
            data: customers
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Get Customer By ID
exports.getCustomerById = async (req, res) => {
    try {
        const customer =
            await customerService.getCustomerById(req.params.id);

        res.status(200).json({
            success: true,
            data: customer
        });

    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};


// Update Customer
exports.updateCustomer = async (req, res) => {
    try {
        const customer =
            await customerService.updateCustomer(
                req.params.id,
                req.body
            );

        res.status(200).json({
            success: true,
            message: "Customer updated successfully",
            data: customer
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


// Delete Customer
exports.deleteCustomer = async (req, res) => {
    try {
        const customer =
            await customerService.deleteCustomer(req.params.id);

        res.status(200).json({
            success: true,
            message: "Customer deleted successfully",
            data: customer
        });

    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};