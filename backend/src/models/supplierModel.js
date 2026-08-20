const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema(
  {
    supplierName: {
      type: String,
      required: [true, "Supplier name is required"],
      trim: true,
    },

    companyName: {
      type: String,
      trim: true,
    },

    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
    },

    gstNumber: {
      type: String,
      trim: true,
    },

    address: {
      street: {
        type: String,
      },

      city: {
        type: String,
      },

      state: {
        type: String,
      },

      pincode: {
        type: String,
      },
    },

    status: {
      type: String,
      enum: [
        "Active",
        "Inactive"
      ],
      default: "Active",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Supplier", supplierSchema);