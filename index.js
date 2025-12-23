const express = require("express");
require("dotenv").config();
const app = express();
const route = require("./routes/client/index.route");
const { Mongoose, default: mongoose } = require("mongoose");

const port = 3000;

mongoose.connect("mongodb://127.0.0.1:27017/project1");

app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static("public"));
route(app);

app.listen(port, () => {
  console.log("kết nối oke");
});
