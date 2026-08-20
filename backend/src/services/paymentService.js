const Payment = require("../models/paymentModel");
const Invoice = require("../models/invoiceModel");


// Recalculate invoice payment status
const updateInvoicePaymentStatus = async (invoiceId) => {

    const invoice = await Invoice.findById(invoiceId);

    if (!invoice) {
        throw new Error("Invoice not found");
    }

    const payments = await Payment.find({
        invoice: invoiceId,
        status: "Completed"
    });

    const paidAmount = payments.reduce(
        (total, payment) => total + payment.amount,
        0
    );

    if (paidAmount === 0) {

        invoice.status = "Unpaid";

    } else if (paidAmount < invoice.totalAmount) {

        invoice.status = "Partially Paid";

    } else if (paidAmount === invoice.totalAmount) {

        invoice.status = "Paid";

    } else {

        throw new Error(
            "Total payments exceed invoice amount"
        );
    }

    await invoice.save();

    return {
        paidAmount,
        remainingAmount:
            invoice.totalAmount - paidAmount
    };
};


// Create Payment
const createPayment = async (data) => {

    const invoice =
        await Invoice.findById(data.invoice);

    if (!invoice) {
        throw new Error("Invoice not found");
    }

    if (invoice.status === "Cancelled") {
        throw new Error(
            "Cannot make payment for cancelled invoice"
        );
    }

    const previousPayments =
        await Payment.find({
            invoice: data.invoice,
            status: "Completed"
        });

    const alreadyPaid = previousPayments.reduce(
        (total, payment) => total + payment.amount,
        0
    );

    const remainingAmount =
        invoice.totalAmount - alreadyPaid;

    if (data.amount > remainingAmount) {
        throw new Error(
            `Payment exceeds remaining amount of ${remainingAmount}`
        );
    }

    const payment =
        await Payment.create(data);

    await updateInvoicePaymentStatus(
        data.invoice
    );

    return payment;
};


// Get All Payments
const getPayments = async () => {

    return await Payment.find()
        .populate("invoice")
        .populate("customer")
        .sort({ createdAt: -1 });
};


// Get Payment By ID
const getPaymentById = async (id) => {

    const payment =
        await Payment.findById(id)
            .populate("invoice")
            .populate("customer");

    if (!payment) {
        throw new Error("Payment not found");
    }

    return payment;
};


// Update Payment
const updatePayment = async (id, data) => {

    const oldPayment =
        await Payment.findById(id);

    if (!oldPayment) {
        throw new Error("Payment not found");
    }

    const invoiceId = oldPayment.invoice;


    // If amount is being changed,
    // make sure it doesn't cause overpayment

    if (data.amount !== undefined) {

        const otherPayments =
            await Payment.find({
                invoice: invoiceId,
                status: "Completed",
                _id: { $ne: id }
            });

        const otherPaidAmount =
            otherPayments.reduce(
                (total, payment) =>
                    total + payment.amount,
                0
            );

        const invoice =
            await Invoice.findById(invoiceId);

        if (
            data.status === "Completed" &&
            otherPaidAmount + data.amount >
            invoice.totalAmount
        ) {
            throw new Error(
                "Updated payment exceeds invoice amount"
            );
        }
    }


    const payment =
        await Payment.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
                runValidators: true
            }
        )
        .populate("invoice")
        .populate("customer");


    await updateInvoicePaymentStatus(
        invoiceId
    );

    return payment;
};


// Delete Payment
const deletePayment = async (id) => {

    const payment =
        await Payment.findById(id);

    if (!payment) {
        throw new Error("Payment not found");
    }

    const invoiceId = payment.invoice;

    await Payment.findByIdAndDelete(id);

    await updateInvoicePaymentStatus(
        invoiceId
    );

    return payment;
};


module.exports = {
    createPayment,
    getPayments,
    getPaymentById,
    updatePayment,
    deletePayment
};