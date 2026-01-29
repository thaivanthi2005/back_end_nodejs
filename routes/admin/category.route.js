const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/category.controller");

router.get("/", controller.categorytest);

module.exports = router;
