const mongoose = require("mongoose");


const stockMovementSchema = new mongoose.Schema({

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


    type:{
        type:String,
        enum:[
            "IN",
            "OUT",
            "TRANSFER"
        ],
        required:true
    },


    quantity:{
        type:Number,
        required:true
    },


    reference:{
        type:String
    },


    note:{
        type:String
    },


    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }


},
{
    timestamps:true
});


module.exports =
mongoose.model(
    "StockMovement",
    stockMovementSchema
);