import express from "express";
import { log } from "@light-experiments/config";
// import { setMidiListeners } from "@light-experiments/midi";
import { Led } from "@light-experiments/hardware";

import { app, server, port } from "./config";
import { runConnect, onDevices } from "./devices";
// import { genericMessage } from "./messaging";
// import * as Notes from "./notes";

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

let testLed: Led | null = null;

onDevices((devices) => {
  // if (devices.midi) {
  //   // Attach the proper listeners to the
  //   // specific device
  //   setMidiListeners(devices.midi, {
  //     noteon: Notes.onNoteOn,
  //     noteoff: Notes.onNoteOff,
  //   });
  // }

  if (devices.board) {
    testLed = new Led(13);
    testLed.blink(1000);
  }
});

// /**
//  * Register global noteon event listener for any midi device
//  * attached, regardless if it reconnects
//  */
// Notes.on("noteon", ({ note }) => {
//   console.log(`note pressed: ${note}`);

//   // if (testLed) {
//   //   testLed.on();
//   // }
// });

// Notes.on("noteoff", () => {
//   console.log("off");
//   // if (testLed) {
//   //   testLed.off();
//   // }
// });

server.listen(port, () => {
  log("Server up and running");
  console.log(`http://localhost:${port}`);
  runConnect();
});
