const salesOrderService = require("../services/salesOrderService");

// Create Sales Order
exports.createSalesOrder = async (req, res) => {
    try {
        const salesOrder =
            await salesOrderService.createSalesOrder(req.body);

        res.status(201).json({
            success: true,
            message: "Sales order created successfully",
            data: salesOrder
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


// Get All Sales Orders
exports.getSalesOrders = async (req, res) => {
    try {
        const salesOrders =
            await salesOrderService.getSalesOrders();

        res.status(200).json({
            success: true,
            data: salesOrders
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Get Sales Order By ID
exports.getSalesOrderById = async (req, res) => {
    try {
        const salesOrder =
            await salesOrderService.getSalesOrderById(
                req.params.id
            );

        res.status(200).json({
            success: true,
            data: salesOrder
        });

    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};


// Update Sales Order
exports.updateSalesOrder = async (req, res) => {
    try {
        const salesOrder =
            await salesOrderService.updateSalesOrder(
                req.params.id,
                req.body
            );

        res.status(200).json({
            success: true,
            message: "Sales order updated successfully",
            data: salesOrder
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


// Delete Sales Order
exports.deleteSalesOrder = async (req, res) => {
    try {
        const salesOrder =
            await salesOrderService.deleteSalesOrder(
                req.params.id
            );

        res.status(200).json({
            success: true,
            message: "Sales order deleted successfully",
            data: salesOrder
        });

    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};


// Process Sales Order
exports.processSalesOrder = async (req, res) => {
    try {
        const salesOrder =
            await salesOrderService.processSalesOrder(
                req.params.id
            );

        res.status(200).json({
            success: true,
            message: "Sales order processed successfully",
            data: salesOrder
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};