const expenseService = require("../services/expenseService");

// Create Expense
exports.createExpense = async (req, res) => {
    try {
        const expense =
            await expenseService.createExpense(req.body);

        res.status(201).json({
            success: true,
            message: "Expense created successfully",
            data: expense
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


// Get All Expenses
exports.getExpenses = async (req, res) => {
    try {
        const expenses =
            await expenseService.getExpenses();

        res.status(200).json({
            success: true,
            data: expenses
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Get Expense By ID
exports.getExpenseById = async (req, res) => {
    try {
        const expense =
            await expenseService.getExpenseById(
                req.params.id
            );

        res.status(200).json({
            success: true,
            data: expense
        });

    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};


// Update Expense
exports.updateExpense = async (req, res) => {
    try {
        const expense =
            await expenseService.updateExpense(
                req.params.id,
                req.body
            );

        res.status(200).json({
            success: true,
            message: "Expense updated successfully",
            data: expense
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


// Delete Expense
exports.deleteExpense = async (req, res) => {
    try {
        const expense =
            await expenseService.deleteExpense(
                req.params.id
            );

        res.status(200).json({
            success: true,
            message: "Expense deleted successfully",
            data: expense
        });

    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};


// Get Expense Summary
exports.getExpenseSummary = async (req, res) => {
    try {
        const summary =
            await expenseService.getExpenseSummary();

        res.status(200).json({
            success: true,
            data: summary
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};