const Product = require("../../models/products.model");
const Category = require("../../models/category.model");
const User = require("../../models/user.model");
const Chat = require("../../models/chat.model");
module.exports.index = async (req, res) => {
  const user_id = res.locals.user.id;
  // SocketIo
  _io.once("connection", async (socket) => {
    console.log("a user connected", socket.id);
    socket.on("CLIENT_SEND_MESSAGE", async (content) => {
      //Lưu vào DATABASE
      const chat = new Chat({
        user_id: user_id,
        content: content,
      });
      await chat.save();
    });
  });

  //Lay data từ database
  const chats = await Chat.find({
    deleted: false,
  });
  for (const chat of chats) {
    const infoUser = await User.findOne({
      _id: chat.user_id,
    }).select("fullName");
    chats.infoUser = infoUser;
  }
  console.log(chats);
  // End SocketIo
  res.render("client/pages/chat/index", {
    pagetitle: "Chat",
    chats: chats,
  });
};
