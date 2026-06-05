const express = require("express");
const router = express.Router();
const controller = require("../../controller/client/cart.controller");
router.post("/add/:productId", controller.addcart);
router.get("/", controller.index);
router.delete("/delete/:id", controller.delete_products);
module.exports = router;
