const User = require("../../models/user.model");

module.exports = (res) => {
  _io.once("connection", async (socket) => {
    socket.on("CLIENT_ADD_FRIEND", async (userId) => {
      const myUserID = res.locals.user.id;
      console.log(userId); // id của B
      console.log(myUserID); // id của A

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
    });
    //Xóa lời mời đã gửi
    socket.on("CLIENT_CANCEL_FRIEND", async (userId) => {
      const myUserID = res.locals.user.id;
      console.log(userId); // id của B
      console.log(myUserID); // id của A

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
    });
  });
};
