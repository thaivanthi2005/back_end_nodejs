//[GET] /
const system_config = require("../../config/system");

module.exports.index = async (req, res) => {
  res.render("client/pages/home/index", {
    pagetitle: "Trang chủ",
  });
};
