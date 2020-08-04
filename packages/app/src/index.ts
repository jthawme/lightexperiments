import express from "express";
import { log } from "@light-experiments/config";

import { app, server, port } from "./config";
import { runConnect, onDevices } from "./devices";
import { genericMessage } from "./messaging";
import { setMidiListeners } from "@light-experiments/midi";
import * as Notes from "./notes";

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

onDevices((devices) => {
  if (devices.midi) {
    // Attach the proper listeners to the
    // specific device
    setMidiListeners(devices.midi, {
      noteon: Notes.onNoteOn,
      noteoff: Notes.onNoteOff,
    });
  }
});

/**
 * Register global noteon event listener for any midi device
 * attached, regardless if it reconnects
 */
Notes.on("noteon", ({ note }) => {
  console.log(`note pressed: ${note}`);
  genericMessage(`Note pressed: ${note}`);
});

server.listen(port, () => {
  log("Server up and running");
  runConnect();
});
