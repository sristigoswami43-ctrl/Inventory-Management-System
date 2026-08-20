const purchaseOrderService =
require("../services/purchaseOrderService");


// Create Purchase Order
const createPurchaseOrder = async (req, res) => {

    try {

        const purchaseOrder =
            await purchaseOrderService.createPurchaseOrder(req.body);

        res.status(201).json({
            success: true,
            message: "Purchase order created successfully",
            data: purchaseOrder
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
};


// Get All Purchase Orders
const getPurchaseOrders = async (req, res) => {

    try {

        const purchaseOrders =
            await purchaseOrderService.getPurchaseOrders();

        res.status(200).json({
            success: true,
            count: purchaseOrders.length,
            data: purchaseOrders
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// Get Purchase Order By ID
const getPurchaseOrderById = async (req, res) => {

    try {

        const purchaseOrder =
            await purchaseOrderService.getPurchaseOrderById(
                req.params.id
            );

        res.status(200).json({
            success: true,
            data: purchaseOrder
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message
        });

    }
};


// Update Purchase Order
const updatePurchaseOrder = async (req, res) => {

    try {

        const purchaseOrder =
            await purchaseOrderService.updatePurchaseOrder(
                req.params.id,
                req.body
            );

        res.status(200).json({
            success: true,
            message: "Purchase order updated successfully",
            data: purchaseOrder
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
};


// Delete Purchase Order
const deletePurchaseOrder = async (req, res) => {

    try {

        await purchaseOrderService.deletePurchaseOrder(
            req.params.id
        );

        res.status(200).json({
            success: true,
            message: "Purchase order deleted successfully"
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message
        });

    }
};

const receivePurchaseOrder = async (req, res) => {

    try {

        const purchaseOrder =
            await purchaseOrderService.receivePurchaseOrder(
                req.params.id
            );

        res.status(200).json({

            success: true,

            message: "Purchase order received successfully",

            data: purchaseOrder

        });

    } catch (error) {

        res.status(400).json({

            success: false,

            message: error.message

        });

    }
};


module.exports = {
    createPurchaseOrder,
    getPurchaseOrders,
    getPurchaseOrderById,
    updatePurchaseOrder,
    deletePurchaseOrder,
    receivePurchaseOrder
};