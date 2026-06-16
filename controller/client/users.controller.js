const Product = require("../../models/products.model");
const Category = require("../../models/category.model");
const Cart = require("../../models/cart.model");
const User = require("../../models/user.model");
const ForgotPassword = require("../../models/forgot-password");
const generateHelper = require("../../helper/generate");
const sendMailHelper = require("../../helper/sendMail");
var md5 = require("md5");

//[GET] /users/not-friend
module.exports.notFriend = async (req, res) => {
  const userId = res.locals.user.id;
  const users = await User.find({
    _id: { $ne: userId },
    status: "active",
    deleted: false,
  }).select("id avatar fullName");
  res.render("client/pages/users/not-friend", {
    pagetitle: "DANH SÁCH NGƯỜI DÙNG",
    users: users,
  });
};
