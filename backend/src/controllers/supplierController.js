const supplierService = require("../services/supplierService");


// ========================================
// CREATE SUPPLIER
// ========================================

exports.createSupplier = async (req, res) => {

    try {

        const supplier =
            await supplierService.createSupplier(req.body);

        res.status(201).json({
            success: true,
            data: supplier
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};


// ========================================
// GET ALL SUPPLIERS
// ========================================

exports.getSuppliers = async (req, res) => {

    try {

        const suppliers =
            await supplierService.getSuppliers();

        res.json({
            success: true,
            data: suppliers
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};


// ========================================
// GET SUPPLIER BY ID
// ========================================

exports.getSupplierById = async (req, res) => {

    try {

        const supplier =
            await supplierService.getSupplierById(req.params.id);

        if (!supplier) {

            return res.status(404).json({
                success: false,
                message: "Supplier not found"
            });

        }

        res.json({
            success: true,
            data: supplier
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};


// ========================================
// UPDATE SUPPLIER
// ========================================

exports.updateSupplier = async (req, res) => {

    try {

        const supplier =
            await supplierService.updateSupplier(
                req.params.id,
                req.body
            );

        if (!supplier) {

            return res.status(404).json({
                success: false,
                message: "Supplier not found"
            });

        }

        res.json({
            success: true,
            data: supplier
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};


// ========================================
// DELETE SUPPLIER
// ========================================

exports.deleteSupplier = async (req, res) => {

    try {

        const supplier =
            await supplierService.deleteSupplier(
                req.params.id
            );

        if (!supplier) {

            return res.status(404).json({
                success: false,
                message: "Supplier not found"
            });

        }

        res.json({
            success: true,
            message: "Supplier deleted successfully"
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};