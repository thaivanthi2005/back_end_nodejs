const Cart = require("../../models/cart.model");

module.exports.checkcart = async (req, res, next) => {
  if (!req.cookies.cartId) {
    const cart = new Cart();
    await cart.save();
    const expiresCookie = 365 * 24 * 60 * 60 * 1000;
    res.cookie("cartId", cart.id, {
      expires: new Date(Date.now() + expiresCookie),
    });
  } else {
    const cart_pro = await Cart.findOne({ _id: req.cookies.cartId });

    // ✅ Thêm check null
    if (!cart_pro) {
      const cart = new Cart();
      await cart.save();
      const expiresCookie = 365 * 24 * 60 * 60 * 1000;
      res.cookie("cartId", cart.id, {
        expires: new Date(Date.now() + expiresCookie),
      });
      res.locals.total_quantity = 0;
    } else {
      const sum_quantity = cart_pro.products.reduce((total, curvalue) => {
        return total + curvalue.quantity;
      }, 0);
      res.locals.total_quantity = sum_quantity;
    }
  }
  next();
};
