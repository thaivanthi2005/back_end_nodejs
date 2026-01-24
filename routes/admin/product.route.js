const express = require("express");
const router = express.Router();
const multer = require("multer");
const fileUpload = multer();
const middleware = require("../../middleware/upload.middleware");
const controller = require("../../controller/admin/product.controller");
router.get("/", controller.index);
router.patch("/change-status/:status/:id", controller.changeStatus);
router.patch("/change-multi", controller.changeMulti);
router.delete("/delete/:id", controller.deleteItem);
router.get("/create", controller.create_products);

router.post(
  "/create",
  fileUpload.single("thumbnail"),
  middleware.upload_images,
  controller.create_products_post,
);

router.get("/edit/:id", controller.edit_products);
router.patch(
  "/edit/:id",
  fileUpload.single("thumbnail"),
  middleware.upload_images,
  controller.edit_products_patch,
);
router.get("/detail/:id", controller.detail_products);
module.exports = router;
