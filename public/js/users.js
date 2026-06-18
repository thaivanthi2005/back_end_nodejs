//chức năng gửi yêu cầu
const listBtnAddFriend = document.querySelectorAll("[btn-add-friend]");
if (listBtnAddFriend.length > 0) {
  listBtnAddFriend.forEach((button) => {
    button.addEventListener("click", () => {
      button.closest(".box-user").classList.add("add");
      const userId = button.getAttribute("btn-add-friend");
      //   console.log(userId);
      socket.emit("CLIENT_ADD_FRIEND", userId);
    });
  });
}
// END chức năng gửi yêu cầu

//chức năng HỦY gửi yêu cầu
const listBtnCancelFriend = document.querySelectorAll("[btn-cancel-friend]");
if (listBtnCancelFriend.length > 0) {
  listBtnCancelFriend.forEach((button) => {
    button.addEventListener("click", () => {
      button.closest(".box-user").classList.remove("add");
      const userId = button.getAttribute("btn-cancel-friend");
      //   console.log(userId);
      socket.emit("CLIENT_CANCEL_FRIEND", userId);
    });
  });
}
// END chức năng HỦY gửi yêu cầu

//chức năng từ chối lời mời kết bạn
const listBtnRefuseFriend = document.querySelectorAll("[btn-refuse-friend]");
if (listBtnRefuseFriend.length > 0) {
  listBtnRefuseFriend.forEach((button) => {
    button.addEventListener("click", () => {
      button.closest(".box-user").classList.add("refuse");
      const userId = button.getAttribute("btn-refuse-friend");
      //   console.log(userId);
      socket.emit("CLIENT_REFUSE_FRIEND", userId);
    });
  });
}
//END chức năng từ chối lời mời kết bạn
