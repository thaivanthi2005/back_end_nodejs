// import { Socket } from "socket.io";

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

//chức năng TỪ CHỐI lời mời kết bạn
const RefuseFriend = (buttonRefuse) => {
  if (buttonRefuse.length > 0) {
    buttonRefuse.forEach((button) => {
      button.addEventListener("click", () => {
        button.closest(".box-user").classList.add("refuse");
        const userId = button.getAttribute("btn-refuse-friend");
        //   console.log(userId);
        socket.emit("CLIENT_REFUSE_FRIEND", userId);
      });
    });
  }
};
const listBtnRefuseFriend = document.querySelectorAll("[btn-refuse-friend]");
RefuseFriend(listBtnRefuseFriend);
//END chức năng TỪ CHỐI lời mời kết bạn

//chức năng CHẤP NHẬN lời mời kết bạn
const AcceptFriend = (buttonAccept) => {
  if (buttonAccept.length > 0) {
    buttonAccept.forEach((button) => {
      button.addEventListener("click", () => {
        button.closest(".box-user").classList.add("accepted");
        const userId = button.getAttribute("btn-accept-friend");
        //   console.log(userId);
        socket.emit("CLIENT_ACCEPT_FRIEND", userId);
      });
    });
  }
};
const listBtnAcceptFriend = document.querySelectorAll("[btn-accept-friend]");
AcceptFriend(listBtnAcceptFriend);
//END chức năng CHẤP NHẬN lời mời kết bạn

// SERVER_RETURN_LENGTH_ACCEPT_FRIEND
const badgeUserAccept = document.querySelector("[badge-users-accept]");
if (badgeUserAccept) {
  const userId = badgeUserAccept.getAttribute("badge-users-accept");
  socket.on("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", (data) => {
    if (userId == data.userId) {
      badgeUserAccept.innerHTML = data.lengthAcceptFriends;
    }
  });
}
// SERVER_RETURN_LENGTH_ACCEPT_FRIEND

//SERVER_RETURN_INFO_ACCEPT_FRIEND
socket.on("SERVER_RETURN_INFO_ACCEPT_FRIEND", (data) => {
  // trang lời mời đã nhận
  const dataUserAccept = document.querySelector("[data-users-accept]");
  if (dataUserAccept) {
    const userId = dataUserAccept.getAttribute("data-users-accept");
    if (userId === data.userId) {
      // vẽ user ra giao diện
      const div = document.createElement("div");
      div.classList.add("col-6");
      div.setAttribute("user-id", data.infoUserA._id);
      div.innerHTML = `<div class="box-user ">
      <div class="inner-avatar">
      <img src="${data.infoUserA.avatar ? data.infoUserA.avatar : "/images/default.jpg"}"  alt="${data.infoUserA.fullName}"></div>
      <div class="inner-info"><div class="inner-name">${data.infoUserA.fullName}</div>
      <div class="inner-buttons"><button class="btn btn-sm btn-primary mr-1" btn-accept-friend="${data.infoUserA._id}">Chấp nhận</button>
      <button class="btn btn-sm btn-secondary mr-1" btn-refuse-friend="${data.infoUserA._id}">Xóa</button>
      <button class="btn btn-sm btn-secondary mr-1" btn-deleted-friend="" disabled>Đã xóa</button>
      <button class="btn btn-sm btn-secondary mr-1" btn-accepted-friend="" disabled>Đã chấp nhận</button></div></div></div>`;
      dataUserAccept.appendChild(div);
      //TỪ CHỐI mời kết bạn
      const buttonRefuse = div.querySelectorAll("[btn-refuse-friend]");
      RefuseFriend(buttonRefuse);
      //Chấp nhận kết bạn
      const buttonAccept = div.querySelectorAll("[btn-accept-friend]");
      AcceptFriend(buttonAccept);
    }
  }
  // trang danh sach người dùng
  const dataUserNotFriend = document.querySelector("[data-users-not-friend]");
  if (dataUserNotFriend) {
    const userId = dataUserNotFriend.getAttribute("data-users-not-friend");
    if (userId === data.userId) {
      const boxUserRemove = dataUserNotFriend.querySelector(
        `[user-id='${data.infoUserA._id}']`,
      );
      if (boxUserRemove) {
        dataUserNotFriend.removeChild(boxUserRemove);
      }
    }
  }
});

//SERVER_RETURN_INFO_ACCEPT_FRIEND

//SERVER_RETURN_USER_ID_CANCEL_FRIEND
socket.on("SERVER_RETURN_USER_ID_CANCEL_FRIEND", (data) => {
  const userIdA = data.userIdA;
  const boxUserRemove = document.querySelector(`[user-id='${userIdA}']`);
  if (boxUserRemove) {
    const dataUserAccept = document.querySelector("[data-users-accept]");
    const userIdB = badgeUserAccept.getAttribute("badge-users-accept");
    if (userIdB == data.userIdB) {
      dataUserAccept.removeChild(boxUserRemove);
    }
  }
});
//SERVER_RETURN_USER_ID_CANCEL_FRIEND

//SERVER_RETURN_USER_ONLINE
socket.on("SERVER_RETURN_USER_ONLINE", (userId) => {
  const dataUserFriend = document.querySelector("[data-users-friend]");
  if (dataUserFriend) {
    const boxUser = dataUserFriend.querySelector(`[user-id="${userId}"]`);
    if (boxUser) {
      const boxStatus = boxUser.querySelector("[status]");
      boxStatus.setAttribute("status", "online");
    }
  }
});
//SERVER_RETURN_USER_ONLINE
