const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
    {
        invoice: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Invoice",
            required: true
        },

        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
            required: true
        },

        amount: {
            type: Number,
            required: true,
            min: 0.01
        },

        paymentMethod: {
            type: String,
            enum: [
                "Cash",
                "Card",
                "UPI",
                "Bank Transfer",
                "Cheque"
            ],
            required: true
        },

        transactionId: {
            type: String,
            trim: true
        },

        paymentDate: {
            type: Date,
            default: Date.now
        },

        status: {
            type: String,
            enum: [
                "Completed",
                "Pending",
                "Failed"
            ],
            default: "Completed"
        },

        note: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Payment",
    paymentSchema
);