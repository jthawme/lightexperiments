import { parentPort } from "worker_threads";

import express from "express";
import { log } from "@light-experiments/config";

import { app, server, port } from "./config";

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

server.listen(port, () => {
  log("Server up and running");
  console.log(`http://localhost:${port}`);

  parentPort?.postMessage({ alive: true });
});