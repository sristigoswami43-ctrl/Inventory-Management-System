const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
    {
        expenseTitle: {
            type: String,
            required: true,
            trim: true
        },

        category: {
            type: String,
            enum: [
                "Purchase",
                "Salary",
                "Rent",
                "Utilities",
                "Transportation",
                "Marketing",
                "Maintenance",
                "Office",
                "Other"
            ],
            required: true
        },

        amount: {
            type: Number,
            required: true,
            min: 0
        },

        description: {
            type: String
        },

        expenseDate: {
            type: Date,
            default: Date.now
        },

        paymentMethod: {
            type: String,
            enum: [
                "Cash",
                "Card",
                "UPI",
                "Bank Transfer",
                "Cheque"
            ]
        },

        status: {
            type: String,
            enum: [
                "Pending",
                "Paid",
                "Cancelled"
            ],
            default: "Paid"
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Expense",
    expenseSchema
);