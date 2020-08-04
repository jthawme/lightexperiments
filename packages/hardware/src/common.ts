import SerialPort from "serialport";

export type CleanupFunction = () => void;

export const getArduinoPort = (): Promise<SerialPort.PortInfo> => {
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
