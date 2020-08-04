import usb from "usb";
import { getInput, MidiInput } from "@light-experiments/midi";
import { connectBoard, BoardOutput } from "@light-experiments/hardware";
import { log } from "@light-experiments/config";

interface DevicesObject {
  midi: null | MidiInput;
  board: null | BoardOutput;
}

interface ConnectObject {
  devices: DevicesObject;
  getDevices: () => DevicesObject;
}

const devices: DevicesObject = {
  midi: null,
  board: null,
};

/**
 * Runs through list of devices to try and reconnect them
 * or nulls them if no longer connected
 */
export async function connectDevices(): Promise<DevicesObject> {
  try {
    devices.midi = await getInput();
  } catch (e) {
    devices.midi = null;
    log("No midi input, swallowing");
  }

  try {
    devices.board = await connectBoard();
  } catch (e) {
    devices.board = null;
    log("No board, swallowing");
  }

  return devices;
}

export const getDevices = (): DevicesObject => devices;

function connectionStatus(devices: DevicesObject) {
  Object.entries(devices).forEach(([key, device]) => {
    log(
      `Device ${key}: ${device !== null ? "connected" : "not connected"}`,
      "DEFAULT"
    );
  });
}

export function runConnect(): Promise<ConnectObject> {
  return connectDevices().then((devices) => {
    connectionStatus(devices);

    return {
      devices,
      getDevices,
    };
  });
}

usb.on("attach", () => {
  setTimeout(() => {
    runConnect();
  }, 500);
});

usb.on("detach", () => {
  setTimeout(() => {
    runConnect();
  }, 500);
});
