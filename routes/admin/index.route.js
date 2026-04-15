const dashboard_router = require("./dashboard.route");
const systemConfig = require("../../config/system");
const product_router = require("./product.route");
const category_route = require("../admin/category.route");
const roles_route = require("../admin/roles.route");
const accounts_route = require("../admin/accounts.route");
const auth_route = require("../admin/auth.route");
module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;
  app.use(PATH_ADMIN + "/dashboard", dashboard_router);
  app.use(PATH_ADMIN + "/products", product_router);
  app.use(PATH_ADMIN + "/category", category_route);
  app.use(PATH_ADMIN + "/roles", roles_route);
  app.use(PATH_ADMIN + "/accounts", accounts_route);
  app.use(PATH_ADMIN + "/auth", auth_route);
};
