const Product = require("../../models/products.model");
const Category = require("../../models/category.model");
const Cart = require("../../models/cart.model");
const User = require("../../models/user.model");
var md5 = require("md5");

//[GET] /user/register
module.exports.index = async (req, res) => {
  res.render("client/pages/user/register", {
    pagetitle: "Đăng Ký",
  });
};
// [POST] /user/register
module.exports.registerPost = async (req, res) => {
  const existEmail = await User.findOne({
    email: req.body.email,
  });
  if (existEmail) {
    req.session.error = ["EMAIL ĐÃ TỒN TẠI"];
    res.redirect("back");
    return;
  }
  req.body.password = md5(req.body.password);
  const user = new User(req.body);
  await user.save();
  res.cookie("tokenUser", user.tokenUser);
  res.redirect(req.get("referer"));
};
