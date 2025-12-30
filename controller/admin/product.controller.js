//[GET] /admin/products
const Product = require("../../models/products.model");
const filterStatusHelper = require("../../helper/filterstatus");
const searchHelper = require("../../helper/search");
module.exports.index = async (req, res) => {
  // console.log(req.query);
  const filterStatus = filterStatusHelper(req.query);

  let find = {
    delete: false,
  };

  if (req.query.status) {
    find.status = req.query.status;
  }

  const objectSearch = searchHelper(req.query);

  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }
  const products2 = await Product.find(find);
  res.render("admin/pages/products/index", {
    pagetitle: "Trang sản phẩm",
    products: products2,
    category: filterStatus,
    keyword: objectSearch.keyword,
  });
};
