const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/roles.controller");
const middleware = require("../../middleware/upload.middleware");
const multer = require("multer");
const fileUpload = multer();

router.get("/", controller.index);
router.get("/create", controller.create);
router.post("/create", fileUpload.single("thumbnail"), controller.create_post);
module.exports = router;
