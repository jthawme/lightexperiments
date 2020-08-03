import usb from "usb";
import { getInput, MidiInput } from "@light-experiments/midi";
import { log } from "@light-experiments/config";
import { emitInfo } from "./messaging";

interface DevicesObject {
  midi: null | MidiInput;
}

const devices: DevicesObject = {
  midi: null,
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

export function runConnect(): void {
  connectDevices().then((devices) => {
    connectionStatus(devices);
    emitInfo();
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
