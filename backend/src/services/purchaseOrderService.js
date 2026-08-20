const PurchaseOrder = require("../models/purchaseOrderModel");
const Inventory = require("../models/inventoryModel");
const StockMovement = require("../models/stockMovementModel");

// Create Purchase Order
const createPurchaseOrder = async (data) => {

    const purchaseOrder = await PurchaseOrder.create(data);

    return purchaseOrder;
};


// Get All Purchase Orders
const getPurchaseOrders = async () => {

    return await PurchaseOrder.find()
        .populate("supplier")
        .populate("warehouse")
        .populate("products.product");
};


// Get Purchase Order By ID
const getPurchaseOrderById = async (id) => {

    const purchaseOrder = await PurchaseOrder.findById(id)
        .populate("supplier")
        .populate("warehouse")
        .populate("products.product");

    if (!purchaseOrder) {
        throw new Error("Purchase order not found");
    }

    return purchaseOrder;
};


// Update Purchase Order
const updatePurchaseOrder = async (id, data) => {

    const purchaseOrder =
        await PurchaseOrder.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
                runValidators: true
            }
        )
        .populate("supplier")
        .populate("warehouse")
        .populate("products.product");

    if (!purchaseOrder) {
        throw new Error("Purchase order not found");
    }

    return purchaseOrder;
};


// Delete Purchase Order
const deletePurchaseOrder = async (id) => {

    const purchaseOrder =
        await PurchaseOrder.findByIdAndDelete(id);

    if (!purchaseOrder) {
        throw new Error("Purchase order not found");
    }

    return purchaseOrder;
};

const receivePurchaseOrder = async (purchaseOrderId) => {

    const purchaseOrder =
        await PurchaseOrder.findById(purchaseOrderId);

    if (!purchaseOrder) {
        throw new Error("Purchase order not found");
    }

    if (purchaseOrder.status === "Received") {
        throw new Error("Purchase order already received");
    }

    if (purchaseOrder.status === "Cancelled") {
        throw new Error("Cancelled purchase order cannot be received");
    }


    // Process every product in the purchase order
    for (const item of purchaseOrder.products) {

        let inventory = await Inventory.findOne({
            product: item.product,
            warehouse: purchaseOrder.warehouse
        });


        // Existing inventory
        if (inventory) {

            inventory.quantity += item.quantity;

            inventory.availableStock =
                inventory.quantity - inventory.reservedStock;

            inventory.lastUpdated = Date.now();

            await inventory.save();

        }

        // No inventory record yet
        else {

            inventory = await Inventory.create({

                product: item.product,

                warehouse: purchaseOrder.warehouse,

                quantity: item.quantity,

                reservedStock: 0,

                availableStock: item.quantity

            });

        }


        // Create stock movement
        const movement = await StockMovement.create({

    product: item.product,

    warehouse: purchaseOrder.warehouse,

    type: "IN",

    quantity: item.quantity,

    reference: purchaseOrder._id.toString(),

    note: "Purchase order received"

});

console.log("STOCK MOVEMENT CREATED:");
console.log(movement);

    }


    // Change PO status
    purchaseOrder.status = "Received";

    await purchaseOrder.save();


    return purchaseOrder;
};


module.exports = {
    createPurchaseOrder,
    getPurchaseOrders,
    getPurchaseOrderById,
    updatePurchaseOrder,
    deletePurchaseOrder,
    receivePurchaseOrder
};