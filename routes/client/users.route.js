const express = require("express");
const router = express.Router();
const controller = require("../../controller/client/users.controller");

router.get("/not-friend", controller.notFriend);
router.get("/requests", controller.requests);
router.get("/accept", controller.accept);

module.exports = router;
