const express = require("express");
const router = express.Router();
const multer = require("multer");
const storageMulter = require("../../helper/storangeMulter");
const upload = multer({ storage: storageMulter() });

const controller = require("../../controller/admin/product.controller");
router.get("/", controller.index);
router.patch("/change-status/:status/:id", controller.changeStatus);
router.patch("/change-multi", controller.changeMulti);
router.delete("/delete/:id", controller.deleteItem);
router.get("/create", controller.create_products);

router.post(
  "/create",
  upload.single("thumbnail"),
  controller.create_products_post,
);

router.get("/edit/:id", controller.edit_products);
router.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  controller.edit_products_patch,
);
module.exports = router;
