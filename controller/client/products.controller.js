module.exports.products = (req, res) => {
  res.render("client/pages/products/index", {
    pagetitle: "Danh sách sản phẩm",
  });
};
