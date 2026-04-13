const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/accounts.controller");
const middleware = require("../../middleware/upload.middleware");
const multer = require("multer");
const fileUpload = multer();

router.get("/", controller.accounts);
router.get("/create", controller.create);
router.post("/create", controller.create_post);
module.exports = router;
