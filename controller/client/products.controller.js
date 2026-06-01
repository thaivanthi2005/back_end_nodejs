const Product = require("../../models/products.model");
const Category = require("../../models/category.model");
//[GET] products
module.exports.products = async (req, res) => {
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
  res.render("client/pages/products/index", {
    pagetitle: "Danh sách sản phẩm",
    products: newProduct,
  });
};

// [GET]/:slug_category
module.exports.slug_category = async (req, res) => {
  const category = await Category.findOne({
    slug: req.params.slug,
    delete: false,
  });
  //category_child
  const category_con = await Category.find({
    parent_id: category.id,
  });
  const category_con_id = category_con.map((item) => {
    return item.id;
  });
  const allCategoryIds = [category.id, ...category_con_id];
  //display
  const products2 = await Product.find({
    status: "InStock",
    delete: false,
    product_category_id: { $in: allCategoryIds },
  }).sort({ position: "desc" });
  const newProduct = products2.map((item) => {
    item.pricenew = (
      (item.price * (100 - item.discountPercentage)) /
      100
    ).toFixed(0);
    return item;
  });
  res.render("client/pages/products/index", {
    pagetitle: category.title,
    products: newProduct,
  });
};

// [GET] /:id
module.exports.product_detail = async (req, res) => {
  const products2 = await Product.findOne({
    status: "InStock",
    delete: false,
    _id: req.params.id,
  }).sort({ position: "desc" });
  res.render("client/pages/products/detail", {
    pagetitle: "Chi Tiết Sản Phẩm",
    product: products2,
  });
};
