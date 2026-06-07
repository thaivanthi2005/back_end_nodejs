const Product = require("../../models/products.model");
const Category = require("../../models/category.model");
const Cart = require("../../models/cart.model");

//[POST] /add/:productId"
module.exports.addcart = async (req, res) => {
  const cartId = req.cookies.cartId;
  const product_id = req.params.productId;
  const quantity = parseInt(req.body.quantity);
  const cart = await Cart.findOne({
    _id: cartId,
  });
  if (cart) {
    const existProductInCart = cart.products.find(
      (item) => item.product_id == product_id,
    );
    if (existProductInCart) {
      const quantityNew = quantity + existProductInCart.quantity;
      await Cart.updateOne(
        {
          _id: cartId,
          "products.product_id": product_id,
        },
        {
          $set: {
            "products.$.quantity": quantityNew,
          },
        },
      );
    } else {
      const objectCart = {
        product_id: product_id,
        quantity: quantity,
      };
      await Cart.updateOne(
        { _id: cartId },
        { $push: { products: objectCart } },
      );
    }
  }

  req.session.success = ["Thêm Giỏ Hàng Thành Công"];
  res.redirect(req.get("referer"));
};

// [GET] /cart
module.exports.index = async (req, res) => {
  const cart = await Cart.findOne({
    _id: req.cookies.cartId,
  });

  let productInfoList = [];

  if (cart.products.length > 0) {
    for (const item of cart.products) {
      const productInfo = await Product.findOne({
        _id: item.product_id,
      });
      if (productInfo) {
        productInfoList.push({
          ...productInfo._doc,
          quantity: item.quantity,
          pricenew: (
            (productInfo.price * (100 - productInfo.discountPercentage)) /
            100
          ).toFixed(0), // thêm giá mới
        });
      }
    }
  }

  res.render("client/pages/cart/index", {
    pagetitle: "Giỏ Hàng",
    productInfo: productInfoList,
  });
};

// [GET] /delete/:id
module.exports.delete_products = async (req, res) => {
  await Cart.updateOne(
    { _id: req.cookies.cartId },
    {
      $pull: {
        products: { product_id: req.params.id },
      },
    },
  );
  req.session.success = ["Xóa Sản Phẩm Giỏ Hàng Thành Công"];
  res.redirect(`/cart`);
};

//[GET] /update/:productId/:quantity
module.exports.update_quantity = async (req, res) => {
  const cartId = req.cookies.cartId;
  const product_id = req.params.productId;
  const quantity = parseInt(req.params.quantity);
  await Cart.updateOne(
    {
      _id: cartId,
      "products.product_id": product_id,
    },
    {
      $set: {
        "products.$.quantity": quantity,
      },
    },
  );
  req.session.success = ["Cập Nhật Số Lượng  Giỏ Hàng Thành Công"];
  res.redirect(`/cart`);
};
