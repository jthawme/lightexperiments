/* global io, document */

const socket = io();

function addMessage(msg) {
  const messages = document.querySelector(".messages");

  const newMessage = document.createElement("p");
  newMessage.innerHTML = msg;
  messages.insertBefore(newMessage, messages.children[0]);

  while (messages.children.length > 10) {
    if (messages.children[10]) {
      messages.children[10].parentElement.removeChild(messages.children[10]);
    }
  }
}

function updateDevices(data) {
  Object.keys(data).forEach((k) => {
    const el = document.querySelector(`.device--${k} .label`);

    if (el) {
      el.innerText = data[k];
    }
  });
}

function sendCommand(command) {
  socket.emit("command", command);
}

socket.on("server", ({ eventType, data }) => {
  switch (eventType) {
    case "generic":
      addMessage(data);
      break;
    case "devices":
      updateDevices(data);
      break;
  }
});

document.getElementById("move").addEventListener("click", () => {
  sendCommand("move");
});

document.getElementById("direction").addEventListener("click", () => {
  sendCommand("direction");
});
