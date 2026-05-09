const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/my-account.controller");
const middleware = require("../../middleware/upload.middleware");
const multer = require("multer");
const { model } = require("mongoose");
const fileUpload = multer();

router.get("/", controller.index);
router.get("/edit", controller.edit);
router.patch(
  "/edit",
  fileUpload.single("avatar"),
  middleware.upload_images,
  controller.edit_path,
);
module.exports = router;
