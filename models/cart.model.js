const mongoose = require("mongoose");
const { products } = require("../controller/client/products.controller");

const cartSchema = new mongoose.Schema(
  {
    user_id: String,
    products: [
      {
        product_id: String,
        quantity: Number,
      },
    ],
  },
  {
    timestamps: true,
  },
);
const Cart = mongoose.model("Cart", cartSchema, "carts");

module.exports = Cart;
