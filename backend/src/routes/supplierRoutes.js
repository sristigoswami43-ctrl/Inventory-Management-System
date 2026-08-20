const express = require("express");

const router = express.Router();


const {
    createSupplier,
    getSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier
} = require("../controllers/supplierController");


// ========================================
// CREATE SUPPLIER
// POST /api/suppliers
// ========================================

router.post(
    "/",
    createSupplier
);


// ========================================
// GET ALL SUPPLIERS
// GET /api/suppliers
// ========================================

router.get(
    "/",
    getSuppliers
);


// ========================================
// GET ONE SUPPLIER
// GET /api/suppliers/:id
// ========================================

router.get(
    "/:id",
    getSupplierById
);


// ========================================
// UPDATE SUPPLIER
// PUT /api/suppliers/:id
// ========================================

router.put(
    "/:id",
    updateSupplier
);


// ========================================
// DELETE SUPPLIER
// DELETE /api/suppliers/:id
// ========================================

router.delete(
    "/:id",
    deleteSupplier
);


module.exports = router;
