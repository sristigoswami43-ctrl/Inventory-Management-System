const Expense = require("../models/expenseModel");


// Create Expense
const createExpense = async (data) => {

    const expense =
        await Expense.create(data);

    return expense;
};


// Get All Expenses
const getExpenses = async () => {

    return await Expense.find()
        .populate("createdBy")
        .sort({ expenseDate: -1 });
};


// Get Expense By ID
const getExpenseById = async (id) => {

    const expense =
        await Expense.findById(id)
            .populate("createdBy");

    if (!expense) {
        throw new Error("Expense not found");
    }

    return expense;
};


// Update Expense
const updateExpense = async (id, data) => {

    const expense =
        await Expense.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
                runValidators: true
            }
        )
        .populate("createdBy");

    if (!expense) {
        throw new Error("Expense not found");
    }

    return expense;
};


// Delete Expense
const deleteExpense = async (id) => {

    const expense =
        await Expense.findByIdAndDelete(id);

    if (!expense) {
        throw new Error("Expense not found");
    }

    return expense;
};


// Get Expense Summary
const getExpenseSummary = async () => {

    const expenses =
        await Expense.find({
            status: "Paid"
        });

    const totalExpenses =
        expenses.reduce(
            (total, expense) =>
                total + expense.amount,
            0
        );


    const categorySummary = {};


    expenses.forEach((expense) => {

        if (!categorySummary[expense.category]) {

            categorySummary[expense.category] = 0;

        }

        categorySummary[expense.category] +=
            expense.amount;

    });


    return {
        totalExpenses,
        categorySummary
    };
};


module.exports = {
    createExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
    getExpenseSummary
};