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
      socket.emit("CLIENT_SENT_TYPING", "hidden");
    }
  });
}
// END CLIENT_SEND_MESSAGE

// SERVER_RETURN_MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data) => {
  const myId = document.querySelector("[my-id]").getAttribute("my-id");
  const body = document.querySelector(".chat .inner-body");
  const boxTyping = document.querySelector(".chat .inner-list-typing");

  const div = document.createElement("div");
  let htmlFullname = "";
  if (myId == data.userId) {
    div.classList.add("inner-outgoing");
  } else {
    htmlFullname = `<div class="inner-name">${data.fullName}</div>`;
    div.classList.add("inner-incoming");
  }
  div.innerHTML = `
    ${htmlFullname}
    <div class="inner-content">${data.content}</div>
  `;
  body.insertBefore(div, boxTyping);
  body.scrollTop = body.scrollHeight;
});
// END SERVER_RETURN_MESSAGE

// Scroll Chat To Bottom
const bodyChat = document.querySelector(".chat .inner-body");
if (bodyChat) {
  bodyChat.scrollTop = bodyChat.scrollHeight;
}
// End Scroll Chat To Bottom
//click out icon
document.addEventListener("click", (e) => {
  if (!button.contains(e.target) && !tooltip.contains(e.target)) {
    tooltip.classList.remove("shown");
  }
});
//END click out icon

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

// SHOW TYPING
var timeout;
const showTyping = () => {
  socket.emit("CLIENT_SENT_TYPING", "show");
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    socket.emit("CLIENT_SENT_TYPING", "hidden");
  }, 3000);
};
// SHOW TYPING

//Insert icon to input

const emojiPicker = document.querySelector("emoji-picker");
if (emojiPicker) {
  const input = document.querySelector(
    ".chat .inner-form input[name='content']",
  );
  emojiPicker.addEventListener("emoji-click", (event) => {
    input.value = input.value + event.detail.unicode;
    input.focus();
    input.setSelectionRange(end, end);
    showTyping();
  });
  // inputKeyup
  input.addEventListener("keyup", () => {
    showTyping();
  });
  //END  inputKeyup
}
// END Insert icon to input

//SERVER-RETURN-TYPING
socket.on("SERVER-RETURN-TYPING", (data) => {
  const elementTyping = document.querySelector(".chat .inner-list-typing");
  if (data.type === "show") {
    const exitsTyping = elementTyping.querySelector(
      `[user-id="${data.userId}"]`,
    );
    if (!exitsTyping) {
      const boxTyping = document.createElement("div");
      boxTyping.classList.add("boxTyping");
      boxTyping.setAttribute("user-id", data.userId);

      boxTyping.innerHTML = `<div class="box-typing">
  <div class="inner-name">${data.fullName}</div>
  <div class="inner-dot">
    <span></span>
    <span></span>
    <span></span>
  </div>
</div>`;
      elementTyping.appendChild(boxTyping);
    }
  } else {
    const boxTypingRemove = elementTyping.querySelector(
      `[user-id="${data.userId}"]`,
    );
    if (boxTypingRemove) {
      elementTyping.removeChild(boxTypingRemove);
    }
  }
});
// END SERVER-RETURN-TYPING
