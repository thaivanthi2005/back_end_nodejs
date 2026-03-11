const Product = require("../../models/roles.model");
const system_config = require("../../config/system");

module.exports.index = async (req, res) => {
  let find = {
    delete: false,
  };
  const products = await Product.find(find);
  res.render("admin/pages/roles/index", {
    pagetitle: "Nhóm Quyền",
    products: products,
  });
};

// [GET] ------ Create roles ------
module.exports.create = async (req, res) => {
  res.render("admin/pages/roles/create", {
    pagetitle: "Thêm Nhóm Quyền",
  });
};
// [GET] ------  End Create roles ------

// [POST] ------ Create roles ------
module.exports.create_post = async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.redirect(`${system_config.prefixAdmin}/roles`);
};
// [POST] ------ ENd Create roles ------
