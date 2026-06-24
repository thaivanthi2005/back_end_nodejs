const uploadToCloudinary = require("../../helper/uploadToCloudinary");
const Chat = require("../../models/chat.model");

module.exports = (req, res) => {
  const user_id = res.locals.user.id;
  const roomChatId = req.params.roomChatId;
  const fullName = res.locals.user.fullName;
  _io.once("connection", async (socket) => {
    socket.join(roomChatId);

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
        room_chat_id: roomChatId,
        user_id: user_id,
        content: data.content,
        images: images,
      });
      await chat.save();

      // Trả data về client
      _io.to(roomChatId).emit("SERVER_RETURN_MESSAGE", {
        fullName: fullName,
        userId: user_id,
        content: data.content,
        images: images,
      });
    });
    //TYPING
    socket.on("CLIENT_SENT_TYPING", async (type) => {
      socket.broadcast.to(roomChatId).emit("SERVER-RETURN-TYPING", {
        fullName: fullName,
        userId: user_id,
        type: type,
      });
    });
    //END TYPING
  });
};
