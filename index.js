const express = require("express");
const methodOverride = require("method-override");
require("dotenv").config();
const app = express();

const route = require("./routes/client/index.route");
const route_admin = require("./routes/admin/index.route");
const database = require("./config/database");
const port = process.env.PORT;
const system_config = require("./config/system");

app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static("public"));
app.use(methodOverride("_method"));

app.locals.prefixAdmin = system_config.prefixAdmin;

route(app);
route_admin(app);

database.connect();

app.listen(port, () => {
  console.log("kết nối oke");
});
