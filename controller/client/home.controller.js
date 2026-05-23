//[GET] /
const system_config = require("../../config/system");
const Product = require("../../models/products.model");

module.exports.index = async (req, res) => {
  const products2 = await Product.find({
    status: "InStock",
    delete: false,
  }).sort({ position: "desc" });
  const newProduct = products2.map((item) => {
    item.pricenew = (
      (item.price * (100 - item.discountPercentage)) /
      100
    ).toFixed(0);
    return item;
  });
  res.render("client/pages/home/index", {
    pagetitle: "Trang chủ",
    products: newProduct,
  });
};
