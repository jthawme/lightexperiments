import express from "express";
import { log } from "@light-experiments/config";
import open from "open";

const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
  log("Server up and running");
  open(`http://localhost:${port}`);
});
