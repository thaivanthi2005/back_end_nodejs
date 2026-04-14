const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/accounts.controller");
const middleware = require("../../middleware/upload.middleware");
const multer = require("multer");
const fileUpload = multer();

router.get("/", controller.accounts);
router.get("/create", controller.create);
router.post(
  "/create",
  fileUpload.single("thumbnail"),
  middleware.upload_images,
  controller.create_post,
);
router.get("/detail/:id", controller.detail);
router.get("/edit/:id", controller.edit);
router.patch(
  "/edit/:id",
  fileUpload.single("thumbnail"),
  middleware.upload_images,
  controller.edit_patch,
);
module.exports = router;
