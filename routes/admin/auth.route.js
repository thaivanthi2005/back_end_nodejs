const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/auth.controller");
const middleware = require("../../middleware/upload.middleware");
const multer = require("multer");
const fileUpload = multer();

router.get("/login", controller.auth_login);
router.post("/login", controller.auth_login_post);

module.exports = router;
