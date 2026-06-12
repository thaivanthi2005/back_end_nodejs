const Product = require("../../models/products.model");
const Category = require("../../models/category.model");
const Cart = require("../../models/cart.model");

module.exports.index = (req, res) => {
  res.render("client/pages/chat/index", {
    pagetitle: "Chat",
  });
};
