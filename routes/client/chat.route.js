const express = require("express");
const router = express.Router();
const controller = require("../../controller/client/chat.controller");
const ChatMiddleware = require("../../middleware/client/chat.middleware");
router.get("/:roomChatId", ChatMiddleware.isAcces, controller.index);

module.exports = router;
