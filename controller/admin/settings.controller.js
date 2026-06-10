const Product = require("../../models/roles.model");
const system_config = require("../../config/system");

//[GET] /admin/settings/general
module.exports.index = async (req, res) => {
  res.render("admin/pages/settings/general", {
    pagetitle: "Cài Đặt Chung",
  });
};
