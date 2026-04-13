const Product = require("../../models/roles.model");
const system_config = require("../../config/system");

module.exports.accounts = async (req, res) => {
  res.render("admin/pages/accounts/index");
};

// -------- GET create -------
module.exports.create = async (req, res) => {
  res.render("admin/pages/accounts/create", {
    pagetitle: "Tạo tài khoản",
  });
};

// -------- POST create -------
module.exports.create_post = async (req, res) => {
  res.send("pa");
};
