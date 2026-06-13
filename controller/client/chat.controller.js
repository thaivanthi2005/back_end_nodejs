const Product = require("../../models/products.model");
const Category = require("../../models/category.model");
const Cart = require("../../models/cart.model");

module.exports.index = (req, res) => {
  // SocketIo
  test.on("connection", (socket) => {
    console.log("a user connected", socket.id);
  });
  // End SocketIo
  res.render("client/pages/chat/index", {
    pagetitle: "Chat",
  });
};
