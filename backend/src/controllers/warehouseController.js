const warehouseService =
require("../services/warehouseService");


// ========================================
// CREATE WAREHOUSE
// POST /api/warehouses
// ========================================

exports.createWarehouse = async (req, res) => {

    try {

        const warehouse =
            await warehouseService.createWarehouse(req.body);

        res.status(201).json({

            success: true,

            data: warehouse

        });

    }
    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ========================================
// GET ALL WAREHOUSES
// GET /api/warehouses
// ========================================

exports.getWarehouses = async (req, res) => {

    try {

        const warehouses =
            await warehouseService.getWarehouses();

        res.json({

            success: true,

            data: warehouses

        });

    }
    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ========================================
// GET WAREHOUSE BY ID
// GET /api/warehouses/:id
// ========================================

exports.getWarehouseById = async (req, res) => {

    try {

        const warehouse =
            await warehouseService.getWarehouseById(
                req.params.id
            );

        if (!warehouse) {

            return res.status(404).json({

                success: false,

                message: "Warehouse not found"

            });

        }

        res.json({

            success: true,

            data: warehouse

        });

    }
    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ========================================
// UPDATE WAREHOUSE
// PUT /api/warehouses/:id
// ========================================

exports.updateWarehouse = async (req, res) => {

    try {

        const warehouse =
            await warehouseService.updateWarehouse(
                req.params.id,
                req.body
            );

        if (!warehouse) {

            return res.status(404).json({

                success: false,

                message: "Warehouse not found"

            });

        }

        res.json({

            success: true,

            message: "Warehouse updated successfully",

            data: warehouse

        });

    }
    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ========================================
// DELETE WAREHOUSE
// DELETE /api/warehouses/:id
// ========================================

exports.deleteWarehouse = async (req, res) => {

    try {

        const warehouse =
            await warehouseService.deleteWarehouse(
                req.params.id
            );

        if (!warehouse) {

            return res.status(404).json({

                success: false,

                message: "Warehouse not found"

            });

        }

        res.json({

            success: true,

            message: "Warehouse deleted successfully"

        });

    }
    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};