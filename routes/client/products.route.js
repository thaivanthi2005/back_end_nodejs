const express = require("express");
const router = express.Router();
const products = require("../../controller/client/products.controller");
router.get("/", products.products);

module.exports = router;
