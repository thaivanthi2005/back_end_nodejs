import * as Popper from "https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js";

// CLIENT_SEND_MESSAGE
const formSendData = document.querySelector(".chat .inner-form");
if (formSendData) {
  formSendData.addEventListener("submit", (e) => {
    e.preventDefault();
    const content = e.target.elements.content.value;
    if (content) {
      socket.emit("CLIENT_SEND_MESSAGE", content);
      e.target.elements.content.value = "";
    }
  });
}
// END CLIENT_SEND_MESSAGE

// SERVER_RETURN_MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data) => {
  const myId = document.querySelector("[my-id]").getAttribute("my-id"); // ✅ sửa
  const body = document.querySelector(".chat .inner-body");
  const div = document.createElement("div");
  let htmlFullname = "";
  if (myId == data.userId) {
    div.classList.add("inner-outgoing"); // ✅ sửa outcoming → outgoing
  } else {
    htmlFullname = `<div class="inner-name">${data.fullName}</div>`;
    div.classList.add("inner-incoming");
  }
  div.innerHTML = `
    ${htmlFullname}
    <div class="inner-content">${data.content}</div>
  `;
  body.appendChild(div);
  body.scrollTop = body.scrollHeight;
});
// END SERVER_RETURN_MESSAGE

// Scroll Chat To Bottom
const bodyChat = document.querySelector(".chat .inner-body");
if (bodyChat) {
  bodyChat.scrollTop = bodyChat.scrollHeight;
}
// End Scroll Chat To Bottom

//Show icon chat
//SHOW POPUP
const button = document.querySelector(".button-icon");
const tooltip = document.querySelector(".tooltip");
Popper.createPopper(button, tooltip, {
  placement: "top",
});
button.onclick = () => {
  tooltip.classList.toggle("shown");
};
//  END SHOW POPUP

//Insert icon to input

const emojiPicker = document.querySelector("emoji-picker");
if (emojiPicker) {
  const input = document.querySelector(
    ".chat .inner-form input[name='content']",
  );
  emojiPicker.addEventListener("emoji-click", (event) => {
    input.value = input.value + event.detail.unicode;
  });
}
// END Insert icon to input

// end Show icon chat
document.addEventListener("click", (e) => {
  if (!button.contains(e.target) && !tooltip.contains(e.target)) {
    tooltip.classList.remove("shown");
  }
});
