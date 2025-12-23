const products_router = require("./products.route");
const home_router = require("./home.route");
module.exports = (app) => {
  app.use("/", home_router);
  app.use("/products", products_router);
};
