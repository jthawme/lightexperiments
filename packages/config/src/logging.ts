import winston from "winston";

import { EMITTERS } from "./constants";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

export const log = (
  msg: string | Error,
  emitter: keyof typeof EMITTERS = "DEFAULT"
) => {
  if (emitter === "ERROR") {
    logger.error(msg);
  } else {
    logger.info(msg);
  }

  if (process.env.NODE_ENV !== "production") {
    console.log([EMITTERS[emitter], msg].join(""));
  }
};
