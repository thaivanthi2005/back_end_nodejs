//[GET] /
const system_config = require("../../config/system");
const Product = require("../../models/products.model");
const helper = require("../../helper/pricenew");
module.exports.index = async (req, res) => {
  const product_featured = await Product.find({
    status: "InStock",
    delete: false,
    featured: "1",
  })
    .sort({ position: "desc" })
    .limit(4);
  const product_new = await Product.find({
    status: "InStock",
    delete: false,
  })
    .sort({ position: "desc" })
    .limit(4);
  const new_product_new = helper.pricenew(product_new);
  const new_product_featured = helper.pricenew(product_featured);
  res.render("client/pages/home/index", {
    pagetitle: "Trang chủ",
    product_featured: new_product_featured,
    product_new: new_product_new,
  });
};
