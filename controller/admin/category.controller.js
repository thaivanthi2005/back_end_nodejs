module.exports.category = async (req, res) => {
  res.render("admin/pages/category/index", {
    pagetitle: "Danh mục sản phẩm",
  });
};

module.exports.category_create = async (req, res) => {
  res.render("admin/pages/category/create", {
    pagetitle: "Danh mục sản phẩm",
  });
};

module.exports.category_create_post = async (req, res) => {
  console.log(req.body);
  res.redirect(req.get("referer"));
};
