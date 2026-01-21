//[GET] /products
const Product = require("../../models/products.model");
module.exports.products = async (req, res) => {
  const products2 = await Product.find({
    status: "InStock",
    delete: false,
  }).sort({ position: "desc" });
  const newProduct = products2.map((item) => {
    item.pricenew = (
      (item.price * (100 - item.discoutprecentage)) /
      100
    ).toFixed(0);
    return item;
  });

  res.render("client/pages/products/index", {
    pagetitle: "Danh sách sản phẩm",
    products: newProduct,
  });
};

module.exports.detail = async (req, res) => {
  const find = {
    delete: false,
    slug: req.params.slug,
  };
  const product = await Product.findOne(find);
  res.render("client/pages/products/detail", {
    product: product,
  });
  // res.send("pkle");
};
