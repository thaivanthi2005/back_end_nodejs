const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/settings.controller");
const middleware = require("../../middleware/upload.middleware");
const multer = require("multer");
const fileUpload = multer();

router.get("/general", controller.index);
router.patch(
  "/general",
  fileUpload.single("logo"),
  middleware.upload_images,
  controller.settingGeneralPOST,
);
module.exports = router;
