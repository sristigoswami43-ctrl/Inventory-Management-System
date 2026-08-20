const express = require("express");

const router = express.Router();

const salesOrderController =
    require("../controllers/salesOrderController");

// Create Sales Order
router.post(
    "/",
    salesOrderController.createSalesOrder
);

// Get All Sales Orders
router.get(
    "/",
    salesOrderController.getSalesOrders
);

// Get Sales Order By ID
router.get(
    "/:id",
    salesOrderController.getSalesOrderById
);

// Update Sales Order
router.put(
    "/:id",
    salesOrderController.updateSalesOrder
);

// Delete Sales Order
router.delete(
    "/:id",
    salesOrderController.deleteSalesOrder
);

// Process Sales Order
router.post(
    "/:id/process",
    salesOrderController.processSalesOrder
);

module.exports = router;