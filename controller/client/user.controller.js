const Product = require("../../models/products.model");
const Category = require("../../models/category.model");
const Cart = require("../../models/cart.model");
const User = require("../../models/user.model");
const ForgotPassword = require("../../models/forgot-password");
const generateHelper = require("../../helper/generate");
var md5 = require("md5");

//[GET] /user/register
module.exports.indexRegister = async (req, res) => {
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
    res.redirect(req.get("referer"));
    return;
  }
  req.body.password = md5(req.body.password);
  const user = new User(req.body);
  await user.save();
  res.cookie("tokenUser", user.tokenUser);
  res.redirect(`/`);
};

//[GET] /user/login
module.exports.indexLogin = async (req, res) => {
  res.render("client/pages/user/login", {
    pagetitle: "Đăng Nhập",
  });
};
// [POST] /user/register
module.exports.loginPost = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({
    email: email,
    deleted: false,
  });
  if (!user) {
    req.session.error = ["EMAIL KO TỒN TẠI"];
    res.redirect(req.get("referer"));
    return;
  }
  if (md5(password) != user.password) {
    req.session.error = ["SAI MẬT KHẨU"];
    res.redirect(req.get("referer"));
    return;
  }
  if (user.password === "inactive") {
    req.session.error = ["TÀI KHOẢN ĐÃ BỊ KHÓA "];
    res.redirect(req.get("referer"));
    return;
  }
  res.cookie("tokenUser", user.tokenUser);

  res.redirect(`/`);
};

//[GET] / user / logout;

module.exports.logout = async (req, res) => {
  res.clearCookie("tokenUser");
  res.redirect(req.get("referer"));
};

// [GET] /password/forgot
module.exports.forgotPassword = async (req, res) => {
  res.render("client/pages/user/forgot-password", {
    pagetitle: "Quên mật khẩu",
  });
};
// [POST] /password/forgot

module.exports.forgotPasswordPost = async (req, res) => {
  const email = req.body.email;

  const user = await User.findOne({
    email: email,
    deleted: false,
  });
  if (!user) {
    req.session.error = ["EMAIL KO TỒN TẠI"];
    res.redirect(req.get("referer"));
    return;
  }
  const otp = generateHelper.generateRandomNumber(8);
  const objectForgotPassword = {
    email: email,
    otp: otp,
    expiresAt: Date.now(),
  };
  // console.log(objectForgotPassword);
  const forgotPassword = new ForgotPassword(objectForgotPassword);
  await forgotPassword.save();
  //Nếu tồn tại email thì gửi mã OTP qua email (viết sau)
  res.send("ple");
};
