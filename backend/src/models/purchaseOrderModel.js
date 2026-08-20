const mongoose = require("mongoose");


const purchaseOrderSchema = new mongoose.Schema({

    supplier:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Supplier",
        required:true
    },


    warehouse:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Warehouse",
        required:true
    },


    products:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product"
            },

            quantity:{
                type:Number,
                required:true
            },

            price:{
                type:Number,
                required:true
            }

        }
    ],


    totalAmount:{
        type:Number,
        required:true
    },


    status:{
        type:String,
        enum:[
            "Pending",
            "Approved",
            "Received",
            "Cancelled"
        ],
        default:"Pending"
    },


    orderDate:{
        type:Date,
        default:Date.now
    }

},
{
    timestamps:true
});


module.exports =
mongoose.model(
"PurchaseOrder",
purchaseOrderSchema
);