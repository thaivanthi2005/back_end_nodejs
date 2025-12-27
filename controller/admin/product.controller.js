module.exports.index = (req, res) => {
  res.render("admin/pages/products/index"),
    {
      pageTitile: "Trang tổng quan",
    };
};
