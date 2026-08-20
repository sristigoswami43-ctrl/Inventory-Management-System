const Product = require("../models/productModel");
const Supplier = require("../models/supplierModel");
const Warehouse = require("../models/warehouseModel");
const Customer = require("../models/customerModel");
const Inventory = require("../models/inventoryModel");
const SalesOrder = require("../models/salesOrderModel");
const PurchaseOrder = require("../models/purchaseOrderModel");
const Invoice = require("../models/invoiceModel");
const Payment = require("../models/paymentModel");
const Expense = require("../models/expenseModel");


const getDashboardSummary = async () => {

    // Counts
    const productCount = await Product.countDocuments();

    const supplierCount = await Supplier.countDocuments();

    const warehouseCount = await Warehouse.countDocuments();

    const customerCount = await Customer.countDocuments();


    // Inventory
   const inventory = await Inventory.find()
    .populate("product");

    const inventoryValue = inventory.reduce(
        (total, item) =>
            total + (
                item.quantity *
                (item.product?.purchasePrice || 0)
            ),
        0
    );


    // Low stock
    const lowStockItems = inventory.filter(
        item =>
            item.availableStock <=
            (item.product?.minimumStock || 0)
    ).length;


    // Revenue
    const invoices = await Invoice.find();

    const totalRevenue = invoices.reduce(
        (total, invoice) =>
            total + invoice.totalAmount,
        0
    );


    // Payments
    const payments = await Payment.find({
        status: "Completed"
    });

    const paidRevenue = payments.reduce(
        (total, payment) =>
            total + payment.amount,
        0
    );


    // Expenses
    const expenses = await Expense.find({
        status: "Paid"
    });

    const totalExpenses = expenses.reduce(
        (total, expense) =>
            total + expense.amount,
        0
    );


    return {

        counts: {
            products: productCount,
            suppliers: supplierCount,
            warehouses: warehouseCount,
            customers: customerCount
        },

        inventory: {
            inventoryValue,
            lowStockItems
        },

        finance: {
            totalRevenue,
            paidRevenue,
            outstandingRevenue:
                Math.max(
                    totalRevenue - paidRevenue,
                    0
                ),
            totalExpenses,
            netProfit:
                totalRevenue - totalExpenses
        }

    };
};


module.exports = {
    getDashboardSummary
};