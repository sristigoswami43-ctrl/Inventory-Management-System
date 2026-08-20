const express = require("express");

const router = express.Router();

const customerController =
    require("../controllers/customerController");

// Create Customer
router.post("/", customerController.createCustomer);

// Get All Customers
router.get("/", customerController.getCustomers);

// Get Customer By ID
router.get("/:id", customerController.getCustomerById);

// Update Customer
router.put("/:id", customerController.updateCustomer);

// Delete Customer
router.delete("/:id", customerController.deleteCustomer);

module.exports = router;