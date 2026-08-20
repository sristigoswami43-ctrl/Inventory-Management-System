const express = require("express");

const router = express.Router();

const {
    createPurchaseOrder,
    getPurchaseOrders,
    getPurchaseOrderById,
    updatePurchaseOrder,
    deletePurchaseOrder,
    receivePurchaseOrder
} = require("../controllers/purchaseOrderController");


router.post("/", createPurchaseOrder);

router.get("/", getPurchaseOrders);

router.get("/:id", getPurchaseOrderById);

router.put("/:id", updatePurchaseOrder);

router.delete("/:id", deletePurchaseOrder);

router.post(
    "/:id/receive",
    receivePurchaseOrder
);

module.exports = router;