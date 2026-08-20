const SalesOrder = require("../models/salesOrderModel");
const Inventory = require("../models/inventoryModel");
const StockMovement = require("../models/stockMovementModel");

// Create Sales Order
const createSalesOrder = async (data) => {
    const salesOrder = await SalesOrder.create(data);

    return salesOrder;
};


// Get All Sales Orders
const getSalesOrders = async () => {
    return await SalesOrder.find()
        .populate("customer")
        .populate("warehouse")
        .populate("products.product")
        .sort({ createdAt: -1 });
};


// Get Sales Order By ID
const getSalesOrderById = async (id) => {
    const salesOrder = await SalesOrder.findById(id)
        .populate("customer")
        .populate("warehouse")
        .populate("products.product");

    if (!salesOrder) {
        throw new Error("Sales order not found");
    }

    return salesOrder;
};


// Update Sales Order
const updateSalesOrder = async (id, data) => {
    const salesOrder = await SalesOrder.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true
        }
    )
        .populate("customer")
        .populate("warehouse")
        .populate("products.product");

    if (!salesOrder) {
        throw new Error("Sales order not found");
    }

    return salesOrder;
};


// Delete Sales Order
const deleteSalesOrder = async (id) => {
    const salesOrder =
        await SalesOrder.findByIdAndDelete(id);

    if (!salesOrder) {
        throw new Error("Sales order not found");
    }

    return salesOrder;
};


// Process Sales Order
const processSalesOrder = async (salesOrderId) => {

    const salesOrder =
        await SalesOrder.findById(salesOrderId);

    if (!salesOrder) {
        throw new Error("Sales order not found");
    }

    if (salesOrder.status === "Cancelled") {
        throw new Error(
            "Cancelled sales order cannot be processed"
        );
    }

    if (
        salesOrder.status === "Shipped" ||
        salesOrder.status === "Delivered"
    ) {
        throw new Error(
            "Sales order has already been processed"
        );
    }


    // Process every product
    for (const item of salesOrder.products) {

        const inventory = await Inventory.findOne({
            product: item.product,
            warehouse: salesOrder.warehouse
        });

        if (!inventory) {
            throw new Error(
                `Inventory not found for product ${item.product}`
            );
        }


        // Check available stock
        if (inventory.availableStock < item.quantity) {
            throw new Error(
                `Insufficient stock for product ${item.product}`
            );
        }


        // Reduce quantity
        inventory.quantity -= item.quantity;

        inventory.availableStock =
            inventory.quantity - inventory.reservedStock;

        inventory.lastUpdated = Date.now();

        await inventory.save();


        // Create OUT stock movement
        await StockMovement.create({

            product: item.product,

            warehouse: salesOrder.warehouse,

            type: "OUT",

            quantity: item.quantity,

            reference: salesOrder._id.toString(),

            note: "Sales order processed"

        });

    }


    // Change status
    salesOrder.status = "Shipped";

    await salesOrder.save();


    return salesOrder;
};


module.exports = {
    createSalesOrder,
    getSalesOrders,
    getSalesOrderById,
    updateSalesOrder,
    deleteSalesOrder,
    processSalesOrder
};