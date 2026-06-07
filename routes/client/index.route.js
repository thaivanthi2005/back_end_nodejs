const Middleware = require("../../middleware/client/category.middleware");
const cart_middleware = require("../../middleware/client/cart.middleware");
const products_router = require("./products.route");
const home_router = require("./home.route");
const search_route = require("./search.route");
const cart_route = require("./cart.route");
const checkout_route = require("./checkout.route");
module.exports = (app) => {
  // ✅ Thêm cart_middleware vào tất cả route dùng header
  app.use(
    "/",
    Middleware.categoryMiddleware,
    cart_middleware.checkcart,
    home_router,
  );
  app.use(
    "/products",
    Middleware.categoryMiddleware,
    cart_middleware.checkcart,
    products_router,
  );
  app.use(
    "/search",
    Middleware.categoryMiddleware,
    cart_middleware.checkcart,
    search_route,
  );
  app.use("/cart", cart_middleware.checkcart, cart_route);
  app.use("/checkout", cart_middleware.checkcart, checkout_route);
};
