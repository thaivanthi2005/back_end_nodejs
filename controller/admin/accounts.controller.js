const accounts = require("../../models/accounts.model");
const system_config = require("../../config/system");
const roles = require("../../models/roles.model");
var md5 = require("md5");

module.exports.accounts = async (req, res) => {
  let find = {
    deleted: false,
  };
  const account = await accounts.find(find);
  res.render("admin/pages/accounts/index", {
    pagetitle: "Tài khoản",
    accounts: account,
  });
  console.log(account);
};

// -------- GET create -------
module.exports.create = async (req, res) => {
  let find = {
    delete: false,
  };
  const role = await roles.find(find);
  res.render("admin/pages/accounts/create", {
    pagetitle: "Tạo tài khoản",
    roles: role,
  });
};

// -------- POST create -------
module.exports.create_post = async (req, res) => {
  req.body.password = md5(req.body.password);
  console.log(req.body);
  const record = new accounts(req.body);
  await record.save();
  res.redirect(`${system_config.prefixAdmin}/accounts`);
};
