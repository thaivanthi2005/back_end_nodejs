const User = require("../../models/user.model");

module.exports.auth_middleware = async (req, res, next) => {
  if (!req.cookies.tokenUser) {
    res.redirect(`/user/login`);
  } else {
    const user = await User.findOne({
      tokenUser: req.cookies.tokenUser,
      deleted: false,
    }).select("-password");
    res.locals.user = user;

    if (!user) {
      res.redirect(`/user/logout`);
    } else {
      if (user.status == "inactive") {
        res.redirect(`/user/logout`);
      } else {
        next();
      }
    }
  }
};
