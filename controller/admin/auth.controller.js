const accounts = require("../../models/accounts.model");
const system_config = require("../../config/system");
const roles = require("../../models/roles.model");
var md5 = require("md5");

// -------------- GET login -----------------
module.exports.auth_login = async (req, res) => {
  res.render("admin/pages/auth/login", {
    pagetitle: "Đăng nhập",
  });
};

// -------------- POST login -----------------
module.exports.auth_login_post = async (req, res) => {
  console.log(req.body);
  const password = req.body.password;
  const email = req.body.email;
  const user = await accounts.findOne({
    email: email,
    deleted: false,
  });
  if (!user) {
    req.session.error = ["Tài Khoản Không Tồn Tại"];
    res.redirect(req.get("referer"));
  } else {
    if (md5(password) != user.password) {
      req.session.error = ["Mật Khẩu Không Đúng!"];
      res.redirect(req.get("referer"));
    } else {
      if (user.status == "inactive") {
        req.session.error = ["Tài Khoản Không còn hoạt động !"];
        res.redirect(req.get("referer"));
      } else {
        res.redirect(`${system_config.prefixAdmin}/dashboard`);
      }
    }
  }
};
