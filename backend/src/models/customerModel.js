const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
      trim: true
    },

    companyName: {
      type: String,
      trim: true
    },

    email: {
      type: String,
      trim: true,
      lowercase: true
    },

    phoneNumber: {
      type: String,
      required: true,
      trim: true
    },

    address: {
      type: String,
      trim: true
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Customer", customerSchema);