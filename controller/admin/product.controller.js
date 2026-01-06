const Product = require("../../models/products.model");
const filterStatusHelper = require("../../helper/filterstatus");
const searchHelper = require("../../helper/search");
const paginatonHelper = require("../../helper/pagination");
const e = require("method-override");
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

  const products2 = await Product.find(find)
    .sort({ position: "desc" })
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
//[PATH] /change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;

  await Product.updateOne({ _id: id }, { status: status });

  req.flash("success", "CẬP NHẠT THÀNH CÔNG");

  res.redirect(req.get("referer"));
};
//[PATCH] /change-multi
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(",");
  switch (type) {
    case "InStock":
      await Product.updateMany({ _id: { $in: ids } }, { status: "InStock" });
      break;
    case "OutStock":
      await Product.updateMany({ _id: { $in: ids } }, { status: "OutStock" });
      break;
    case "delete-all":
      await Product.updateMany(
        { _id: { $in: ids } },
        { delete: true, deletedAt: new Date() }
      );
      break;
    case "change-position":
      for (const item of ids) {
        let [id, position] = item.split("-");
        position = parseInt(position);
        await Product.updateOne({ _id: id }, { position: position });
      }
      break;
    default:
      break;
  }
  res.redirect(req.get("referer"));
};

//[DELETE] /delete/:id
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;

  // await Product.deleteOne({ _id: id });
  await Product.updateOne({ _id: id }, { delete: true, deletedAt: new Date() });
  res.redirect(req.get("referer"));
};
