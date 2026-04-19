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

//[GET] ----------- EDIT ROLES --------------
module.exports.edit_roles = async (req, res) => {
  console.log(req.params.id);
  let find = {
    delete: false,
    _id: req.params.id,
  };
  const products = await Product.findOne(find);
  res.render("admin/pages/roles/edit", {
    pagetitle: "Sửa Nhóm Quyền",
    products: products,
  });
};
//[GET] ----------- END EDIT ROLES --------------

//[PATCH] ----------- EDIT ROLES --------------
module.exports.edit_roles_patch = async (req, res) => {
  const id = req.params.id;
  try {
    await Product.updateOne({ _id: id }, req.body);
    res.redirect(`${system_config.prefixAdmin}/roles`);
  } catch (error) {
    res.redirect(`${system_config.prefixAdmin}/products`);
  }
};
//[PATCH] ----------- END EDIT ROLES --------------

//[DELETE] ----------- DELETE ROLES --------------
module.exports.delete_roles = async (req, res) => {
  const id = req.params.id;

  // await Product.deleteOne({ _id: id });
  await Product.updateOne({ _id: id }, { delete: true, deletedAt: new Date() });
  req.session.success = ["CẬP NHẬT THÀNH CÔNG"];

  res.redirect(req.get("referer"));
};
//[DELETE] ----------- DELETE ROLES --------------

//[GET] ----------- permissions --------------
module.exports.permissions = async (req, res) => {
  const roles = await Product.find({ delete: false });

  res.render("admin/pages/roles/permissions", {
    pagetitle: "Phân Quyền",
    roles1: roles,
  });
};
//[GET] ----------- END permissions --------------

//[PATCH] -----------permissions --------------

module.exports.permissions_patch = async (req, res) => {
  const ar = JSON.parse(req.body.permissions);
  for (const item of ar) {
    await Product.updateOne(
      { _id: item.id },
      { permissions: item.permissions },
    );
  }
  req.session.success = ["CẬP NHẬT THÀNH CÔNG"];
  res.redirect(req.get("referer"));
};

//[PATCH] -----------End permissions --------------
