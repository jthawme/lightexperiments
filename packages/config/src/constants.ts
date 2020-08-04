import chalk from "chalk";

export const EMITTERS = {
  DEFAULT: chalk.gray("MSG: "),
  SERIAL: chalk.cyan("SERIAL: "),
  ERROR: chalk.red("ERR: "),
};

export enum SpecialMidiKeys {
  DIR = "dir",
  START = "start",
  ALIVE = "alive",
}

export const MIDI_KEYS = {
  [SpecialMidiKeys.DIR]: 97,
  [SpecialMidiKeys.START]: 98,
  [SpecialMidiKeys.ALIVE]: 99,
};
