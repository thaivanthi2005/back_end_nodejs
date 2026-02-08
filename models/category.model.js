const mongoose = require("mongoose");
slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const product_schema_category = new mongoose.Schema(
  {
    title: String,
    parent_id: {
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
const Product1 = mongoose.model(
  "Product_category",
  product_schema_category,
  "category",
);
module.exports = Product1;
