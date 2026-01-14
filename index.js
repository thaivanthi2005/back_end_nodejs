const express = require("express");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const session = require("express-session");

require("dotenv").config();
const app = express();

const route = require("./routes/client/index.route");
const route_admin = require("./routes/admin/index.route");
const database = require("./config/database");
const port = process.env.PORT;
const system_config = require("./config/system");

app.use(methodOverride("_method"));

app.use(bodyParser.urlencoded({ extended: false }));

app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static("public"));
app.locals.prefixAdmin = system_config.prefixAdmin;
//flash
// ===== SESSION =====
app.use(
  session({
    secret: "secret_key",
    resave: false,
    saveUninitialized: true,
  })
);

// ===== FLASH TỰ VIẾT =====
app.use((req, res, next) => {
  // đưa ra view
  res.locals.success = req.session.success || [];
  res.locals.error = req.session.error || [];

  // clear sau khi đọc
  req.session.success = [];
  req.session.error = [];

  next();
});

//End flash
route(app);
route_admin(app);

database.connect();

app.listen(port, () => {
  console.log("kết nối oke");
});
