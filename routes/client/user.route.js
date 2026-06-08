const express = require("express");
const router = express.Router();
const controller = require("../../controller/client/user.controller");
const validate = require("../../validate/client/user.validate");
router.get("/register", controller.index);
router.post("/register", validate.registerPost, controller.registerPost);
module.exports = router;
