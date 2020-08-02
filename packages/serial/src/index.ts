import SerialPort from "serialport";
import Readline from "@serialport/parser-readline";
import { log } from "@light-experiments/config";

const MESSAGE_DEFAULTS = {
  START: "<",
  END: ">",
  LINE_END: "\n",
};

export const getArduinoPort = () => {
  return new Promise((resolve, reject) => {
    SerialPort.list()
      .then((ports) => {
        const port = ports.find((p) => {
          return (
            p.manufacturer && p.manufacturer.toLowerCase().includes("arduino")
          );
        });

        if (port) {
          resolve(port);
        } else {
          reject(new Error("No arduino connected"));
        }
      })
      .catch((err) => reject(err));
  });
};

const sendMessage = (
  port: SerialPort,
  msg: string,
  options = MESSAGE_DEFAULTS
) => {
  port.write(
    [options.START, msg, options.END, options.LINE_END].join(""),
    (err) => {
      if (err) {
        log(err, "ERROR");
      } else {
        log(`Sent message (${msg})`, "SERIAL");
      }
    }
  );
};

export const getSerialPort = (
  portName: string,
  onData: (data: any) => void,
  onReady: () => void,
  baudRate: number = 9600
) => {
  const mainPort = new SerialPort(portName, { baudRate });
  const parser = new Readline();

  let ready = false;

  mainPort.pipe(parser);
  parser.on("data", (data: any) => {
    if (!ready) {
      ready = true;
      onReady();
    } else {
      onData(data);
    }
  });

  return {
    sendMessage: (msg: string) => sendMessage(mainPort, msg),
    destroy: () => mainPort.destroy(),
  };
};
