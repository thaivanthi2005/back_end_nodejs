const express = require("express");
const app = express();
const route = require("./routes/client/index.route.js");
const port = 3000;

app.set("views", "./views");
app.set("view engine", "pug");

route(app);
app.listen(port, () => {
  console.log("kết nối oke");
});
