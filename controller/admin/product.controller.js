//[GET] /admin/products
const Product = require("../../models/products.model");

module.exports.index = async (req, res) => {
  const products2 = await Product.find({
    delete: false,
  });
  res.render("admin/pages/products/index", {
    pagetitle: "Trang sản phẩm",
    products: products2,
  });
};
