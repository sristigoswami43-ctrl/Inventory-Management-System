const paymentService = require("../services/paymentService");

// Create Payment
exports.createPayment = async (req, res) => {
    try {
        const payment =
            await paymentService.createPayment(req.body);

        res.status(201).json({
            success: true,
            message: "Payment created successfully",
            data: payment
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


// Get All Payments
exports.getPayments = async (req, res) => {
    try {
        const payments =
            await paymentService.getPayments();

        res.status(200).json({
            success: true,
            data: payments
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Get Payment By ID
exports.getPaymentById = async (req, res) => {
    try {
        const payment =
            await paymentService.getPaymentById(
                req.params.id
            );

        res.status(200).json({
            success: true,
            data: payment
        });

    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};


// Update Payment
exports.updatePayment = async (req, res) => {
    try {
        const payment =
            await paymentService.updatePayment(
                req.params.id,
                req.body
            );

        res.status(200).json({
            success: true,
            message: "Payment updated successfully",
            data: payment
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


// Delete Payment
exports.deletePayment = async (req, res) => {
    try {
        const payment =
            await paymentService.deletePayment(
                req.params.id
            );

        res.status(200).json({
            success: true,
            message: "Payment deleted successfully",
            data: payment
        });

    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};