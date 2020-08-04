import { spawn, PromisifySpawnOptions } from "promisify-child-process";
import { getArduinoPort } from "../src/common";

const FBQN = "arduino:avr:uno";
const SKETCH = `${__dirname}/firmware.ino`;
const ARDUINO = "/usr/local/bin/arduino-cli";

const spawnWithProgress = (
  cmd: string,
  args: string[],
  options?: PromisifySpawnOptions
) => {
  const proc = spawn(cmd, args, options);

  proc.stdout?.on("data", (data) => console.log(data.toString()));
  proc.stderr?.on("data", (data) => console.log(data.toString()));

  return proc;
};

console.log("---- Compiling");
spawnWithProgress(ARDUINO, ["compile", "-b", FBQN, SKETCH], {
  encoding: "utf8",
})
  .then(() => {
    console.log("---- Compiled");

    return getArduinoPort();
  })
  .then((port) => {
    console.log("---- Uploading");
    return spawnWithProgress(
      ARDUINO,
      ["upload", "-b", FBQN, "-p", port.path, SKETCH],
      {
        encoding: "utf8",
      }
    );
  })
  .then(() => {
    console.log("---- Uploaded");
  });
