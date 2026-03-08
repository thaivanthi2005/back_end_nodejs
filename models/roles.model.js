const mongoose = require("mongoose");

const Product_roles = new mongoose.Schema(
  {
    title: String,
    description: String,
    permissions: {
      type: Array,
      default: [],
    },
    delete: {
      type: Boolean,
      default: false,
    },

    deletedAt: Date,
  },
  {
    timestamps: true,
  },
);
const Product = mongoose.model("Product_roles", Product_roles, "roles");
module.exports = Product;
