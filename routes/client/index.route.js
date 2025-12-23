const products_router = require("./products.route");

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.render("client/pages/home/index");
  });
  app.use("/products", products_router);
};
