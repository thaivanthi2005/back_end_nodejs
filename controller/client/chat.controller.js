const Product = require("../../models/products.model");
const Category = require("../../models/category.model");
const User = require("../../models/user.model");
const Chat = require("../../models/chat.model");

const uploadToCloudinary = require("../../helper/uploadToCloudinary");
const chatSocket = require("../../sockets/client/chat.socket");
// [GET] /chat/:roomChatId
module.exports.index = async (req, res) => {
  const roomChatId = req.params.roomChatId;
  // SocketIo
  chatSocket(req, res);
  // END SocketIo
  // Lay data từ database
  const chats = await Chat.find({
    room_chat_id: roomChatId,
    deleted: false,
  });
  for (const chat of chats) {
    const infoUser = await User.findOne({
      _id: chat.user_id,
    }).select("fullName");
    chat.infoUser = infoUser;
  }
  res.render("client/pages/chat/index", {
    pagetitle: "Chat",
    chats: chats,
  });
};
