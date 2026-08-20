const Inventory = require("../models/inventoryModel");
const StockMovement = require("../models/stockMovementModel");



const stockIn = async(data)=>{


    let inventory = await Inventory.findOne({

        product:data.product,

        warehouse:data.warehouse

    });



    // If inventory already exists
  if(inventory){


    inventory.quantity += data.quantity;


    inventory.reservedStock =
    data.reservedStock || inventory.reservedStock;


    inventory.availableStock =
    inventory.quantity - inventory.reservedStock;


    inventory.lastUpdated = Date.now();


    await inventory.save();


}
    else{


        inventory = await Inventory.create({

            product:data.product,

            warehouse:data.warehouse,

            quantity:data.quantity,

            reservedStock:data.reservedStock || 0,

            availableStock:
            data.quantity - (data.reservedStock || 0)

        });


    }



    // Create Stock Movement Record

    await StockMovement.create({

        product:data.product,

        warehouse:data.warehouse,

        type:"IN",

        quantity:data.quantity,

        reference:data.reference || "STOCK-IN",

        note:data.note || "Stock received"

    });



    return inventory;

};




const getInventory = async()=>{


    return await Inventory.find()

    .populate("product")

    .populate("warehouse");


};



module.exports={

stockIn,

getInventory

};