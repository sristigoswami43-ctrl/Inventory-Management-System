const Invoice = require("../models/invoiceModel");
const SalesOrder = require("../models/salesOrderModel");
const Payment = require("../models/paymentModel");


// Create Invoice
const createInvoice = async (data) => {

    const salesOrder = await SalesOrder.findById(data.salesOrder);

    if (!salesOrder) {
        throw new Error("Sales order not found");
    }

    if (salesOrder.status === "Cancelled") {
        throw new Error(
            "Cannot create invoice for cancelled sales order"
        );
    }

    // Prevent duplicate invoice
    const existingInvoice = await Invoice.findOne({
        salesOrder: data.salesOrder
    });

    if (existingInvoice) {
        throw new Error(
            "Invoice already exists for this sales order"
        );
    }

    const invoice = await Invoice.create(data);

    return invoice;
};


// Get All Invoices
const getInvoices = async () => {

    const invoices = await Invoice.find()
        .populate("salesOrder")
        .populate("customer")
        .populate("products.product")
        .sort({ createdAt: -1 });

    const invoicesWithPaymentSummary = await Promise.all(

        invoices.map(async (invoice) => {

            const payments = await Payment.find({
                invoice: invoice._id,
                status: "Completed"
            });

            const paidAmount = payments.reduce(
                (total, payment) => total + payment.amount,
                0
            );

            const remainingAmount =
                Math.max(
                    invoice.totalAmount - paidAmount,
                    0
                );

            return {
                ...invoice.toObject(),

                paidAmount,

                remainingAmount,

                paymentCount: payments.length
            };
        })
    );

    return invoicesWithPaymentSummary;
};


// Get Invoice By ID
const getInvoiceById = async (id) => {

    const invoice = await Invoice.findById(id)
        .populate("salesOrder")
        .populate("customer")
        .populate("products.product");

    if (!invoice) {
        throw new Error("Invoice not found");
    }


    // Get completed payments
    const payments = await Payment.find({
        invoice: id,
        status: "Completed"
    })
        .populate("customer")
        .sort({ paymentDate: -1 });


    // Calculate total paid
    const paidAmount = payments.reduce(
        (total, payment) => total + payment.amount,
        0
    );


    // Calculate remaining
    const remainingAmount =
        Math.max(
            invoice.totalAmount - paidAmount,
            0
        );


    return {

        ...invoice.toObject(),

        paidAmount,

        remainingAmount,

        paymentCount: payments.length,

        payments

    };
};


// Update Invoice
const updateInvoice = async (id, data) => {

    const invoice =
        await Invoice.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
                runValidators: true
            }
        )
        .populate("salesOrder")
        .populate("customer")
        .populate("products.product");

    if (!invoice) {
        throw new Error("Invoice not found");
    }

    return invoice;
};


// Delete Invoice
const deleteInvoice = async (id) => {

    const invoice =
        await Invoice.findByIdAndDelete(id);

    if (!invoice) {
        throw new Error("Invoice not found");
    }

    return invoice;
};


module.exports = {
    createInvoice,
    getInvoices,
    getInvoiceById,
    updateInvoice,
    deleteInvoice
};