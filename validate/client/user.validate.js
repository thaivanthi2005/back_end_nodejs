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
module.exports.loginPost = (req, res, next) => {
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

module.exports.restPassword = (req, res, next) => {
  if (!req.body.password || !req.body.confirmPassword) {
    req.session.error = ["VUI LONG NHAP DAY DU !"];
    res.redirect(req.get("referer"));
    return;
  }
  if (req.body.password != req.body.confirmPassword) {
    req.session.error = ["MẬT KHẨU KHÔNG TRÙNG KHỚP"];
    res.redirect(req.get("referer"));
    return;
  }
  next();
};
