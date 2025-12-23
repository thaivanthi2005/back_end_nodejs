const express = require("express");
require("dotenv").config();
const app = express();
const route = require("./routes/client/index.route");

const port = 3000;

app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static("public"));
route(app);

app.listen(port, () => {
  console.log("kết nối oke");
});
