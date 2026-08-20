const express = require("express");

const router = express.Router();

const {
    createWarehouse,
    getWarehouses,
    getWarehouseById,
    updateWarehouse,
    deleteWarehouse
} = require("../controllers/warehouseController");


// ========================================
// CREATE WAREHOUSE
// POST /api/warehouses
// ========================================

router.post(
    "/",
    createWarehouse
);


// ========================================
// GET ALL WAREHOUSES
// GET /api/warehouses
// ========================================

router.get(
    "/",
    getWarehouses
);


// ========================================
// GET ONE WAREHOUSE
// GET /api/warehouses/:id
// ========================================

router.get(
    "/:id",
    getWarehouseById
);


// ========================================
// UPDATE WAREHOUSE
// PUT /api/warehouses/:id
// ========================================

router.put(
    "/:id",
    updateWarehouse
);


// ========================================
// DELETE WAREHOUSE
// DELETE /api/warehouses/:id
// ========================================

router.delete(
    "/:id",
    deleteWarehouse
);


module.exports = router;