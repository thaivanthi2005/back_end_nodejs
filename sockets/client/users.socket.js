const User = require("../../models/user.model");
const RoomChat = require("../../models/rooms-chat.model");
module.exports = (res) => {
  _io.once("connection", async (socket) => {
    //Gửi lời mời kết bạn
    socket.on("CLIENT_ADD_FRIEND", async (userId) => {
      const myUserID = res.locals.user.id;
      // console.log(userId); // id của B
      // console.log(myUserID); // id của A

      //them id của A vào acceptFriends của B
      const exitsIdAinB = await User.findOne({
        _id: userId,
        acceptFriends: myUserID,
      });
      if (!exitsIdAinB) {
        await User.updateOne(
          {
            _id: userId,
          },
          {
            $push: { acceptFriends: myUserID },
          },
        );
      }
      //them id của B vào requestFriends của A
      const exitsIdBinA = await User.findOne({
        _id: myUserID,
        requestFriends: userId,
      });
      if (!exitsIdAinB) {
        await User.updateOne(
          {
            _id: myUserID,
          },
          {
            $push: { requestFriends: userId },
          },
        );
      }

      //Lẩy ra độ dài acceptFriends của B trả về B
      const infoUserB = await User.findOne({
        _id: userId,
      });
      const lengthAcceptFriends = infoUserB.acceptFriends.length;
      socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", {
        userId: userId,
        lengthAcceptFriends: lengthAcceptFriends,
      });
      //Lẩy ra độ dài info của A trả về B
      const infoUserA = await User.findOne({
        _id: myUserID,
      }).select("avatar id fullName");
      socket.broadcast.emit("SERVER_RETURN_INFO_ACCEPT_FRIEND", {
        userId: userId,
        infoUserA: infoUserA,
      });
    });
    //Xóa (hủy gửi ) lời mời đã gửi
    socket.on("CLIENT_CANCEL_FRIEND", async (userId) => {
      const myUserID = res.locals.user.id;
      // console.log(userId); // id của B
      // console.log(myUserID); // id của A

      //Xóa id của A vào acceptFriends của B
      const exitsIdAinB = await User.findOne({
        _id: userId,
        acceptFriends: myUserID,
      });
      if (exitsIdAinB) {
        await User.updateOne(
          {
            _id: userId,
          },
          {
            $pull: { acceptFriends: myUserID },
          },
        );
      }
      //Xóa id của B vào requestFriends của A
      const exitsIdBinA = await User.findOne({
        _id: myUserID,
        requestFriends: userId,
      });
      if (exitsIdBinA) {
        await User.updateOne(
          {
            _id: myUserID,
          },
          {
            $pull: { requestFriends: userId },
          },
        );
      }
      //Lẩy ra độ dài acceptFriends của B trả về B
      const infoUserB = await User.findOne({
        _id: userId,
      });
      const lengthAcceptFriends = infoUserB.acceptFriends.length;
      socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", {
        userId: userId,
        lengthAcceptFriends: lengthAcceptFriends,
      });
      //Lấy id của ông A và trả về cho ông B
      socket.broadcast.emit("SERVER_RETURN_USER_ID_CANCEL_FRIEND", {
        userIdB: userId,
        userIdA: myUserID,
      });
    });
    //TỪ chối kết bạn
    socket.on("CLIENT_REFUSE_FRIEND", async (userId) => {
      const myUserID = res.locals.user.id;
      // console.log(userId); // id của A
      // console.log(myUserID); // id của B

      //Xóa id của A vào acceptFriends của B
      const exitsIdAinB = await User.findOne({
        _id: myUserID,
        acceptFriends: userId,
      });
      if (exitsIdAinB) {
        await User.updateOne(
          {
            _id: myUserID,
          },
          {
            $pull: { acceptFriends: userId },
          },
        );
      }
      //Xóa id của B vào requestFriends của A
      const exitsIdBinA = await User.findOne({
        _id: userId,
        requestFriends: myUserID,
      });
      if (exitsIdBinA) {
        await User.updateOne(
          {
            _id: userId,
          },
          {
            $pull: { requestFriends: myUserID },
          },
        );
      }
    });
    //Chấp nhận kết bạn
    socket.on("CLIENT_ACCEPT_FRIEND", async (userId) => {
      const myUserID = res.locals.user.id;
      // console.log(userId); // id của A
      // console.log(myUserID); // id của B
      //check exist
      const exitsIdAinB = await User.findOne({
        _id: myUserID,
        acceptFriends: userId,
      });
      const exitsIdBinA = await User.findOne({
        _id: userId,
        requestFriends: myUserID,
      });
      //end check exist
      //Tạo phòng chat chung
      let roomChat;
      if (exitsIdAinB && exitsIdBinA) {
        const dataRoom = {
          typeRoom: "friend",
          users: [
            {
              user_id: userId,
              role: "superAdmin",
            },
            {
              user_id: myUserID,
              role: "superAdmin",
            },
          ],
        };
        roomChat = new RoomChat(dataRoom);
        await roomChat.save();
      }

      //END Tạo phòng chat chung
      //Thêm {user_id,room_chat_id} của A vào friendsList của B
      //Xóa id của A vào acceptFriends của B

      if (exitsIdAinB) {
        await User.updateOne(
          {
            _id: myUserID,
          },
          {
            $push: {
              friendList: {
                user_id: userId,
                room_chat_id: roomChat.id,
              },
            },
            $pull: { acceptFriends: userId },
          },
        );
      }
      //Thêm {user_id,room_chat_id} của B vào friendsList của A
      //Xóa id của B vào requestFriends của A

      if (exitsIdBinA) {
        await User.updateOne(
          {
            _id: userId,
          },
          {
            $push: {
              friendList: {
                user_id: myUserID,
                room_chat_id: roomChat.id,
              },
            },
            $pull: { requestFriends: myUserID },
          },
        );
      }
    });
  });
};
