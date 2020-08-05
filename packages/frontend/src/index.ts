import express from "express";

import { app, server, port, io } from "./config";
import { ServerObject, EventData, EventCallback } from "./types";

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

const events: { [key: string]: Array<EventCallback> } = {};

const on: ServerObject["on"] = (evt, cb) => {
  if (!events[evt]) {
    events[evt] = [];
  }

  events[evt].push(cb);

  registerListeners();
};

const off: ServerObject["off"] = (evt, cb) => {
  if (cb) {
    const idx = events[evt].indexOf(cb);
    events[evt].splice(idx, 1);
  } else {
    events[evt] = [];
  }
  registerListeners();
};

const registerListeners = () => {
  ["message", "connection", "command"].forEach((evtKey) => {
    io.removeAllListeners(evtKey);
    io.on(evtKey, (data: EventData) => {
      if (events[evtKey]) {
        events[evtKey].forEach((evt) => evt(data));
      }
    });
  });
};

const send: ServerObject["send"] = (eventType, data) => {
  io.emit("server", {
    eventType,
    data,
  });
};

export const startServer = (): Promise<ServerObject> => {
  return new Promise((resolve) => {
    server.listen(port, () => {
      resolve({
        url: `http://localhost:${port}`,
        on,
        off,
        send,
        destroy: () => {
          server.close();
        },
      });
    });
  });
};
