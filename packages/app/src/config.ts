import express from "express";
import http from "http";
import socketIO from "socket.io";

export const app = express();
export const server = http.createServer(app);
export const port = 8080;
export const io = socketIO(server);
