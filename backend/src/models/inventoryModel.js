const mongoose = require("mongoose");


const inventorySchema = new mongoose.Schema({

    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },


    warehouse:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Warehouse",
        required:true
    },


    quantity:{
        type:Number,
        default:0
    },


    reservedStock:{
        type:Number,
        default:0
    },


    availableStock:{
        type:Number,
        default:0
    },


    lastUpdated:{
        type:Date,
        default:Date.now
    }


},
{
    timestamps:true
});


module.exports =
mongoose.model("Inventory",inventorySchema);