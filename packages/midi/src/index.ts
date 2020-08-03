import easymidi from "easymidi";

interface InputEventsDictionary {
  [key: string]: (options: easymidi.Note) => void;
}

function filterOptions(name?: string, input?: boolean): string | undefined {
  const devices = input ? easymidi.getInputs() : easymidi.getOutputs();

  return name ? devices.find((i) => i === name) : devices[0];
}

export type MidiInput = easymidi.Input;

export const getInput = (name?: string): Promise<easymidi.Input> => {
  return new Promise((resolve, reject) => {
    const input = filterOptions(name, true);

    if (!input) {
      reject(
        new Error(name ? "No input with that name found" : "No inputs found")
      );
    } else {
      resolve(new easymidi.Input(input));
    }
  });
};

export const getOutput = (name?: string): Promise<easymidi.Output> => {
  return new Promise((resolve, reject) => {
    const output = filterOptions(name, true);

    if (!output) {
      reject(
        new Error(name ? "No output with that name found" : "No outputs found")
      );
    } else {
      resolve(new easymidi.Output(output));
    }
  });
};

export const setMidiListeners = (
  input: easymidi.Input,
  evts: InputEventsDictionary
): void => {
  Object.keys(evts).forEach((evt) => {
    input.on(evt as "noteon" | "noteoff", evts[evt]);
  });
};
