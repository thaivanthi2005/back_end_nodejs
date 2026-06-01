const system_config = require("../../config/system");
const Product = require("../../models/products.model");
const helper = require("../../helper/pricenew");

module.exports.index = async (req, res) => {
  const keyword = req.query.keyword;
  if (keyword) {
    const regex = new RegExp(keyword, "i");
    console.log(regex);
    const products = await Product.find({
      status: "InStock",
      delete: false,
      title: regex,
    });
    console.log(products);
    res.render("client/pages/search/index", {
      products: products,
      pagetitle: "Tìm Kiếm Sản Phẩm",
    });
  }
};
