/* global io */
const socket = io();
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  socket.emit("message", document.querySelector("input").value);
});

socket.on("devices", (obj) => {
  Object.keys(obj).forEach((k) => {
    const el = document.querySelector(`.device--${k} .label`);

    if (el) {
      el.innerText = obj[k];
    }
  });
});
