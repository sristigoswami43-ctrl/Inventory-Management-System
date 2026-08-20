const invoiceService = require("../services/invoiceService");

// Create Invoice
exports.createInvoice = async (req, res) => {
    try {
        const invoice =
            await invoiceService.createInvoice(req.body);

        res.status(201).json({
            success: true,
            message: "Invoice created successfully",
            data: invoice
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


// Get All Invoices
exports.getInvoices = async (req, res) => {
    try {
        const invoices =
            await invoiceService.getInvoices();

        res.status(200).json({
            success: true,
            data: invoices
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Get Invoice By ID
exports.getInvoiceById = async (req, res) => {
    try {
        const invoice =
            await invoiceService.getInvoiceById(
                req.params.id
            );

        res.status(200).json({
            success: true,
            data: invoice
        });

    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};


// Update Invoice
exports.updateInvoice = async (req, res) => {
    try {
        const invoice =
            await invoiceService.updateInvoice(
                req.params.id,
                req.body
            );

        res.status(200).json({
            success: true,
            message: "Invoice updated successfully",
            data: invoice
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


// Delete Invoice
exports.deleteInvoice = async (req, res) => {
    try {
        const invoice =
            await invoiceService.deleteInvoice(
                req.params.id
            );

        res.status(200).json({
            success: true,
            message: "Invoice deleted successfully",
            data: invoice
        });

    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};