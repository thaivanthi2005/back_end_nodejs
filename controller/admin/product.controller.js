//[GET] /admin/products
const Product = require("../../models/products.model");

module.exports.index = async (req, res) => {
  // console.log(req.query);
  let category = [
    {
      name: "Tất cả",
      status: "",
      class: "",
    },
    {
      name: "Còn hàng",
      status: "InStock",
      class: "",
    },
    {
      name: "Hết hàng",
      status: "OutStock",
      class: "",
    },
  ];

  if (req.query.status) {
    const index = category.findIndex((item) => item.status == req.query.status);
    category[index].class = "active";
  } else {
    const index = category.findIndex((item) => item.status == "");
    category[index].class = "active";
  }

  let find = {
    delete: false,
  };

  if (req.query.status) {
    find.status = req.query.status;
  }
  if (req.query.keyword) {
    find.title = req.query.keyword;
  }
  const products2 = await Product.find(find);
  res.render("admin/pages/products/index", {
    pagetitle: "Trang sản phẩm",
    products: products2,
    category: category,
  });
};
