const express = require("express");

const router = express.Router();

const expenseController =
    require("../controllers/expenseController");


// Create Expense
router.post(
    "/",
    expenseController.createExpense
);


// Get All Expenses
router.get(
    "/",
    expenseController.getExpenses
);


// Get Expense Summary
router.get(
    "/summary",
    expenseController.getExpenseSummary
);


// Get Expense By ID
router.get(
    "/:id",
    expenseController.getExpenseById
);


// Update Expense
router.put(
    "/:id",
    expenseController.updateExpense
);


// Delete Expense
router.delete(
    "/:id",
    expenseController.deleteExpense
);


module.exports = router;