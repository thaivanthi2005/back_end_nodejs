module.exports.registerPost = (req, res, next) => {
  if (!req.body.fullName) {
    req.session.error = ["Vui lòng nhập họ tên!"];
    res.redirect(req.get("referer"));
    return;
  }

  if (!req.body.email) {
    req.session.error = ["Vui lòng nhập email!"];
    res.redirect(req.get("referer"));
    return;
  }

  if (!req.body.password) {
    req.session.error = ["Vui lòng nhập mật khẩu!"];
    res.redirect(req.get("referer"));
    return;
  }

  next();
};
