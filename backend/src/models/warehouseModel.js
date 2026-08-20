const mongoose = require("mongoose");

const warehouseSchema = new mongoose.Schema(
  {
    warehouseName: {
      type: String,
      required: [true, "Warehouse name is required"],
      trim: true,
    },

    location: {
      type: String,
      required: [true, "Warehouse location is required"],
      trim: true,
    },

    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    capacity: {
      type: Number,
      default: 0,
      min: 0,
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


module.exports = mongoose.model("Warehouse", warehouseSchema);