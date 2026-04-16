module.exports.login_Post = (req, res, next) => {
  if (!req.body.email) {
    req.session.error = ["VUI LÒNG NHẬP GMAIL"];
    res.redirect(req.get("referer"));
  }
  if (!req.body.password) {
    req.session.error = ["VUI LÒNG NHẬP MẬT KHẨU"];
    res.redirect(req.get("referer"));
  }
  next();
};
