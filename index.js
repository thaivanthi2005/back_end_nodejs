const express = require("express");
require("dotenv").config();
const app = express();

const route = require("./routes/client/index.route");
const route_admin = require("./routes/admin/index.route");

const database = require("./config/database");
const port = process.env.PORT;

app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static("public"));

route(app);
route_admin(app);

database.connect();

app.listen(port, () => {
  console.log("kết nối oke");
});
