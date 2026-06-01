const Product = require("../../models/products.model");
const Category = require("../../models/category.model");
//[POST] /add/:productId"
module.exports.addcart = async (req, res) => {
  console.log(req.params.productId);
  console.log(req.body.quantity);
  res.send("oke");
};
