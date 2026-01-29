module.exports.categorytest = async (req, res) => {
  res.render("admin/pages/category/index", {
    pagetitle: "Danh mục sản phẩm",
  });
};
