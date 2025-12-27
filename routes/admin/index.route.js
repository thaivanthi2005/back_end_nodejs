const dashboard_router = require("./dashboard.route");
const systemConfig = require("../../config/system");
const product_router = require("./product.route");

module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;
  app.use(PATH_ADMIN + "/dashboard", dashboard_router);
  app.use(PATH_ADMIN + "/products", product_router);
};
