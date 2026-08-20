const express = require("express");

const router = express.Router();

const paymentController =
    require("../controllers/paymentController");

// Create Payment
router.post(
    "/",
    paymentController.createPayment
);

// Get All Payments
router.get(
    "/",
    paymentController.getPayments
);

// Get Payment By ID
router.get(
    "/:id",
    paymentController.getPaymentById
);

// Update Payment
router.put(
    "/:id",
    paymentController.updatePayment
);

// Delete Payment
router.delete(
    "/:id",
    paymentController.deletePayment
);

module.exports = router;