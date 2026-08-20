const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
    {
        invoiceNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        salesOrder: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SalesOrder",
            required: true
        },

        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
            required: true
        },

        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },

                quantity: {
                    type: Number,
                    required: true,
                    min: 1
                },

                price: {
                    type: Number,
                    required: true,
                    min: 0
                },

                total: {
                    type: Number,
                    required: true,
                    min: 0
                }
            }
        ],

        subtotal: {
            type: Number,
            required: true,
            min: 0
        },

        tax: {
            type: Number,
            default: 0,
            min: 0
        },

        discount: {
            type: Number,
            default: 0,
            min: 0
        },

        totalAmount: {
            type: Number,
            required: true,
            min: 0
        },

        status: {
            type: String,
            enum: [
                "Unpaid",
                "Partially Paid",
                "Paid",
                "Cancelled"
            ],
            default: "Unpaid"
        },

        dueDate: {
            type: Date
        },

        invoiceDate: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Invoice",
    invoiceSchema
);