const dashboard_router = require("./dashboard.route");
const systemConfig = require("../../config/system");
const product_router = require("./product.route");
const category_route = require("../admin/category.route");
const roles_route = require("../admin/roles.route");
const accounts_route = require("../admin/accounts.route");
const auth_route = require("../admin/auth.route");
const middleware = require("../../middleware/auth.middleware");

module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;
  app.use(
    PATH_ADMIN + "/dashboard",
    middleware.auth_middleware,
    dashboard_router,
  );
  app.use(PATH_ADMIN + "/products", middleware.auth_middleware, product_router);
  app.use(PATH_ADMIN + "/category", middleware.auth_middleware, category_route);
  app.use(PATH_ADMIN + "/roles", middleware.auth_middleware, roles_route);
  app.use(PATH_ADMIN + "/accounts", middleware.auth_middleware, accounts_route);
  app.use(PATH_ADMIN + "/auth", auth_route);
};
