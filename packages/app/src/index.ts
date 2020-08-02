import express from "express";
import http from "http";
import open from "open";
import socketIO from "socket.io";
import { log } from "@light-experiments/config";

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = 8080;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  log("a user connected");

  socket.on("message", (msg) => {
    log("msg: " + msg);
  });
});

server.listen(port, () => {
  log("Server up and running");
  open(`http://localhost:${port}`);
});
