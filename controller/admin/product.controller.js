const Product = require("../../models/products.model");
const filterStatusHelper = require("../../helper/filterstatus");
const searchHelper = require("../../helper/search");
const paginatonHelper = require("../../helper/pagination");
//[GET] /admin/products
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

  //pagination
  const coutProduct = await Product.countDocuments(find);

  let objectPagination = paginatonHelper(
    {
      currentPage: 1,
      limitItem: 4,
    },
    req.query,
    coutProduct
  );

  // if (req.query.page) {
  //   objectPagination.currentPage = parseInt(req.query.page);
  // }
  // objectPagination.skip =
  //   (objectPagination.currentPage - 1) * objectPagination.limitItem;

  // const coutProduct = await Product.countDocuments(find);
  // const totalPage = Math.ceil(coutProduct / objectPagination.limitItem);
  // objectPagination.totalPage = totalPage;
  //end pagination

  const products2 = await Product.find(find)
    .limit(objectPagination.limitItem)
    .skip(objectPagination.skip);

  res.render("admin/pages/products/index", {
    pagetitle: "Trang sản phẩm",
    products: products2,
    category: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination,
  });
};
//[GET] /change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;

  await Product.updateOne({ _id: id }, { status: status });

  res.redirect("../..");
};
