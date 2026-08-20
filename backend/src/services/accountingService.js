const Invoice = require("../models/invoiceModel");
const Payment = require("../models/paymentModel");
const Expense = require("../models/expenseModel");


// Get Financial Summary
const getFinancialSummary = async () => {

    // ============================
    // INVOICES / REVENUE
    // ============================

    const invoices = await Invoice.find();

    const totalRevenue = invoices.reduce(
        (total, invoice) =>
            total + invoice.totalAmount,
        0
    );


    // ============================
    // PAYMENTS RECEIVED
    // ============================

    const payments = await Payment.find({
        status: "Completed"
    });

    const paidRevenue = payments.reduce(
        (total, payment) =>
            total + payment.amount,
        0
    );


    // ============================
    // OUTSTANDING RECEIVABLE
    // ============================

    const outstandingRevenue =
        Math.max(
            totalRevenue - paidRevenue,
            0
        );


    // ============================
    // EXPENSES
    // ============================

    const expenses = await Expense.find({
        status: "Paid"
    });

    const totalExpenses = expenses.reduce(
        (total, expense) =>
            total + expense.amount,
        0
    );


    // ============================
    // NET PROFIT
    // ============================

    const netProfit =
        totalRevenue - totalExpenses;


    // ============================
    // INVOICE COUNTS
    // ============================

    const paidInvoices =
        await Invoice.countDocuments({
            status: "Paid"
        });

    const partiallyPaidInvoices =
        await Invoice.countDocuments({
            status: "Partially Paid"
        });

    const unpaidInvoices =
        await Invoice.countDocuments({
            status: "Unpaid"
        });


    // ============================
    // EXPENSE CATEGORY SUMMARY
    // ============================

    const expenseCategorySummary = {};

    expenses.forEach((expense) => {

        if (!expenseCategorySummary[expense.category]) {
            expenseCategorySummary[expense.category] = 0;
        }

        expenseCategorySummary[expense.category] +=
            expense.amount;
    });


    return {

        totalRevenue,

        paidRevenue,

        outstandingRevenue,

        totalExpenses,

        netProfit,

        invoiceCount: invoices.length,

        paidInvoices,

        partiallyPaidInvoices,

        unpaidInvoices,

        expenseCategorySummary

    };
};


module.exports = {
    getFinancialSummary
};