const express = require("express");
const router = express.Router();
const products = require("../../controller/client/products.controller");
router.get("/", products.products);
router.get("/slug", products.slug_category);
router.get("/:id", products.product_detail);
module.exports = router;
