import { log } from "@light-experiments/config";
// import { setMidiListeners } from "@light-experiments/midi";
// import { Led } from "@light-experiments/hardware";

import { runConnect } from "./devices";

import { startServer } from "@light-experiments/frontend";

Promise.all([startServer(), runConnect()]).then(([Server, Devices]) => {
  log(`Server running: ${Server.url}`);

  const sendDevices = () => {
    Server.send("devices", {
      midi: Devices.getDevices().midi?.name || "Not connected",
      board: Devices.getDevices().board?.port || "Not connected",
    });
  };

  // Register listener for any message from front end
  Server.on("message", (data) => {
    log(`Message from front end: ${data.toString()}`);

    Server.send("generic", "Read ya bud");
  });

  // Register listener to any connection to front end
  Server.on("connection", () => {
    sendDevices();
  });
});
