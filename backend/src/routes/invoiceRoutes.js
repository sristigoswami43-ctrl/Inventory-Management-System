const express = require("express");

const router = express.Router();

const invoiceController =
    require("../controllers/invoiceController");

// Create Invoice
router.post(
    "/",
    invoiceController.createInvoice
);

// Get All Invoices
router.get(
    "/",
    invoiceController.getInvoices
);

// Get Invoice By ID
router.get(
    "/:id",
    invoiceController.getInvoiceById
);

// Update Invoice
router.put(
    "/:id",
    invoiceController.updateInvoice
);

// Delete Invoice
router.delete(
    "/:id",
    invoiceController.deleteInvoice
);

module.exports = router;