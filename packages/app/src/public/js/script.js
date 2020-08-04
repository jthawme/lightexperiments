/* global io */
const socket = io();

socket.on("devices", (obj) => {
  Object.keys(obj).forEach((k) => {
    const el = document.querySelector(`.device--${k} .label`);

    if (el) {
      el.innerText = obj[k];
    }
  });
});

socket.on("generic", (msg) => {
  const messages = document.querySelector(".messages");

  const newMessage = document.createElement("p");
  newMessage.innerHTML = msg;
  messages.insertBefore(newMessage, messages.children[0]);

  while (messages.children.length > 10) {
    if (messages.children[10]) {
      messages.children[10].parentElement.removeChild(messages.children[10]);
    }
  }
});
