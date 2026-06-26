const system_config = require("../../config/system");
const Product = require("../../models/products.model");
const helper = require("../../helper/pricenew");

//[GET] /
module.exports.index = async (req, res) => {
  res.render("client/pages//rooms-chat/index", {
    pagetitle: "Phòng Chat",
  });
};
