const mongoose = require("mongoose");

const product_schema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  discoutprecentage: Number,
  stock: Number,
  thumbnail: String,
  status: String,
  rating: Number,
  delete: Boolean,
  deletedAt: Date,
});
const Product = mongoose.model("Product", product_schema, "project1");

module.exports = Product;
