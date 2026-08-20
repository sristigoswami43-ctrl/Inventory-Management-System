const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },

    brand: {
      type: String,
      required: [true, "Brand is required"],
      trim: true,
    },

    purchasePrice: {
      type: Number,
      required: [true, "Purchase price is required"],
      min: 0,
    },

    sellingPrice: {
      type: Number,
      required: [true, "Selling price is required"],
      min: 0,
    },

    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      default: 0,
      min: 0,
    },

    minimumStock: {
      type: Number,
      required: [true, "Minimum stock is required"],
      default: 5,
      min: 0,
    },

    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },

    warehouse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warehouse",
      required: true,
    },

    expiryDate: {
      type: Date,
    },

    status: {
      type: String,
      enum: [
        "Available",
        "Low Stock",
        "Out of Stock",
        "Expired",
      ],
      default: "Available",
    },
  },
  {
    timestamps: true,
  }
);

/*
 Automatically update status before saving
*/

productSchema.pre("save", function () {
  const today = new Date();

  if (this.expiryDate && this.expiryDate < today) {
    this.status = "Expired";
  } else if (this.quantity === 0) {
    this.status = "Out of Stock";
  } else if (this.quantity <= this.minimumStock) {
    this.status = "Low Stock";
  } else {
    this.status = "Available";
  }

});

module.exports = mongoose.model("Product", productSchema);