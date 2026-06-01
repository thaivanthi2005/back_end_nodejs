const Middleware = require("../../middleware/client/category.middleware");
const cart_middleware = require("../../middleware/client/cart.middleware");
const products_router = require("./products.route");
const home_router = require("./home.route");
const search_route = require("./search.route");
const cart_route = require("./cart.route");
module.exports = (app) => {
  app.use("/", Middleware.categoryMiddleware, home_router);
  app.use("/products", Middleware.categoryMiddleware, products_router);
  app.use("/search", Middleware.categoryMiddleware, search_route);
  app.use("/cart", cart_middleware.checkcart, cart_route);
};
