const express = require("express");
const router = express.Router();
const controller = require("../../controller/client/cart.controller");
router.post("/add/:productId", controller.addcart);
router.get("/", controller.index);
router.get("/delete/:id", controller.delete_products);
router.get("/update/:productId/:quantity", controller.update_quantity);
module.exports = router;
