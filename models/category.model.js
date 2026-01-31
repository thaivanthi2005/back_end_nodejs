const mongoose = require("mongoose");
slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const product_schema = new mongoose.Schema(
  {
    title: String,
    paren_id: {
      type: String,
      default: "",
    },
    description: String,
    thumbnail: String,
    status: String,
    slug: {
      type: String,
      slug: "title",
      unique: true,
    },
    delete: {
      type: Boolean,
      default: false,
    },

    deletedAt: Date,
    position: Number,
  },
  {
    timestamps: true,
  },
);
const Product = mongoose.model("Product", product_schema, "category");
module.exports = Product;
