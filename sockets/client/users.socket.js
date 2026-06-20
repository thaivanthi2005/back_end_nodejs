const User = require("../../models/user.model");

module.exports = (res) => {
  //Gửi lời mời kết bạn
  _io.once("connection", async (socket) => {
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
    //Xóa lời mời đã gửi
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
      //Thêm {user_id,room_chat_id} của A vào friendsList của B
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
            $push: {
              friendList: {
                user_id: userId,
                room_chat_id: "",
              },
            },
            $pull: { acceptFriends: userId },
          },
        );
      }
      //Thêm {user_id,room_chat_id} của B vào friendsList của A
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
            $push: {
              friendList: {
                user_id: myUserID,
                room_chat_id: "",
              },
            },
            $pull: { requestFriends: myUserID },
          },
        );
      }
    });
  });
};
