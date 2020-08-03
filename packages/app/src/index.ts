import express from "express";
import { log } from "@light-experiments/config";

import { app, server, port } from "./config";
import { runConnect } from "./devices";

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

server.listen(port, () => {
  log("Server up and running");
  runConnect();
});
