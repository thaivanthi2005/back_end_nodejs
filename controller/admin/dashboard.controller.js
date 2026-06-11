const Product = require("../../models/products.model");
const Category = require("../../models/category.model");
const Accounts = require("../../models/accounts.model");
const User = require("../../models/user.model");

//[GET] /admin/dashboard
module.exports.dashboard = async (req, res) => {
  const statistic = {
    categoryProduct: {
      total: 0,
      active: 0,
      inactive: 0,
    },
    product: {
      total: 0,
      active: 0,
      inactive: 0,
    },
    account: {
      total: 0,
      active: 0,
      inactive: 0,
    },
    user: {
      total: 0,
      active: 0,
      inactive: 0,
    },
  };
  statistic.categoryProduct.total = await Category.where({
    delete: false,
  }).countDocuments();
  statistic.categoryProduct.active = await Category.countDocuments({
    delete: false,
    status: "InStock",
  });
  statistic.categoryProduct.inactive = await Category.countDocuments({
    delete: false,
    status: "OutStock",
  });

  statistic.product.total = await Product.countDocuments({ delete: false });
  statistic.product.active = await Product.countDocuments({
    delete: false,
    status: "InStock",
  });
  statistic.product.inactive = await Product.countDocuments({
    delete: false,
    status: "OutStock",
  });

  statistic.account.total = await Accounts.countDocuments({ deleted: false });
  statistic.account.active = await Accounts.countDocuments({
    deleted: false,
    status: "active",
  });
  statistic.account.inactive = await Accounts.countDocuments({
    deleted: false,
    status: "inactive",
  });

  statistic.user.total = await User.countDocuments({ deleted: false });
  statistic.user.active = await User.countDocuments({
    deleted: false,
    status: "active",
  });
  statistic.user.inactive = await User.countDocuments({
    deleted: false,
    status: "inactive",
  });
  res.render("admin/pages/dashboard/index", {
    pagetitle: "Trang tổng quan",
    statistic: statistic,
  });
};
