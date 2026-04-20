const mongoose = require("mongoose");
slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const product_schema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
  thumbnail: String,
  status: String,
  rating: Number,
  slug: {
    type: String,
    slug: "title",
    unique: true,
  },
  createdBy: {
    account_id: {
      type: String,
    },
    createdAt: {
      type: String,
      default: Date.now,
    },
  },
  delete: {
    type: Boolean,
    default: false,
  },

  deletedAt: Date,
  position: Number,
});
const Product = mongoose.model("Product", product_schema, "project1");
module.exports = Product;
