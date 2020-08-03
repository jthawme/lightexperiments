import { log } from "@light-experiments/config";
import { io } from "./config";
import { getDevices } from "./devices";

export const emitInfo = (): void => {
  io.emit("devices", {
    midi: getDevices().midi?.name || "Not connected",
  });
};

io.on("connection", (socket) => {
  emitInfo();

  socket.on("message", (msg) => {
    log("msg: " + msg);
  });
});