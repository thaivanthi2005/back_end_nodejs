const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/category.controller");
const multer = require("multer");
const fileUpload = multer();
router.get("/", controller.category);
router.get("/create", controller.category_create);
router.post(
  "/create",
  fileUpload.single("thumbnail"),
  controller.category_create_post,
);
module.exports = router;
