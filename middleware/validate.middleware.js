module.exports.validate = (req, res, next) => {
  if (!req.body.title) {
    req.session.success = ["VUI LÒNG NHẬP VÀO TIÊU ĐỀ !!!!"];
    res.redirect(req.get("referer"));
    return;
  }

  if (!req.body.description) {
    req.session.success = ["VUI LÒNG NHẬP VÀO MIÊU TẢ!!!!"];
    res.redirect(req.get("referer"));
    return;
  }
  if (!parseInt(req.body.price)) {
    req.session.success = ["VUI LÒNG NHẬP VÀO GIÁ!!!!"];
    res.redirect(req.get("referer"));
    return;
  }
  if (!parseInt(req.body.discountPercentage)) {
    req.session.success = ["VUI LÒNG NHẬP VÀO GIẢM GIÁ!!!!"];
    res.redirect(req.get("referer"));
    return;
  }
  if (!parseInt(req.body.stock)) {
    req.session.success = ["VUI LÒNG NHẬP VÀO sỐ lƯỢNG!!!!"];
    res.redirect(req.get("referer"));
    return;
  }
  next();
};
