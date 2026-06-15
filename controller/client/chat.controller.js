const Product = require("../../models/products.model");
const Category = require("../../models/category.model");
const User = require("../../models/user.model");
const Chat = require("../../models/chat.model");

const uploadToCloudinary = require("../../helper/uploadToCloudinary");

module.exports.index = async (req, res) => {
  const user_id = res.locals.user.id;
  const fullName = res.locals.user.fullName;
  // SocketIo
  _io.once("connection", async (socket) => {
    console.log("a user connected", socket.id);
    socket.on("CLIENT_SEND_MESSAGE", async (data) => {
      let images = [];
      for (const imagebuffer of data.images) {
        const link = await uploadToCloudinary(imagebuffer);
        images.push(link);
      }
      console.log(images);
      //Lưu vào DATABASE
      const chat = new Chat({
        user_id: user_id,
        content: data.content,
        images: images,
      });
      await chat.save();

      // Trả data về client
      _io.emit("SERVER_RETURN_MESSAGE", {
        fullName: fullName,
        userId: user_id,
        content: data.content,
        images: images,
      });
    });
    //TYPING
    socket.on("CLIENT_SENT_TYPING", async (type) => {
      socket.broadcast.emit("SERVER-RETURN-TYPING", {
        fullName: fullName,
        userId: user_id,
        type: type,
      });
    });
    //END TYPING
  });
  // END SocketIo
  // Lay data từ database
  const chats = await Chat.find({
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
