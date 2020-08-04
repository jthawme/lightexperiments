import { Note } from "@light-experiments/midi";
import { MIDI_KEYS, SpecialMidiKeys } from "@light-experiments/config";

const events: { [key: string]: Array<(note: Note) => void> } = {
  [SpecialMidiKeys.START]: [],
  [SpecialMidiKeys.ALIVE]: [],
  [SpecialMidiKeys.DIR]: [],
  noteon: [],
  noteoff: [],
};

const isSpecialNote = (note: number): string | false => {
  switch (note) {
    case MIDI_KEYS[SpecialMidiKeys.START]:
      return SpecialMidiKeys.START;
    case MIDI_KEYS[SpecialMidiKeys.ALIVE]:
      return SpecialMidiKeys.ALIVE;
    case MIDI_KEYS[SpecialMidiKeys.DIR]:
      return SpecialMidiKeys.DIR;
    default:
      return false;
  }
};

export const onNoteOn = ({ channel, note, velocity }: Note): void => {
  const specialNote = isSpecialNote(note);
  if (specialNote) {
    events[specialNote as keyof typeof events].forEach((evt) =>
      evt({ channel, note, velocity })
    );
  } else {
    events.noteon.forEach((evt) => evt({ channel, note, velocity }));
  }
};

export const onNoteOff = ({ channel, note, velocity }: Note): void => {
  const specialNote = isSpecialNote(note);
  if (specialNote) {
    events[specialNote as keyof typeof events].forEach((evt) =>
      evt({ channel, note, velocity })
    );
  } else {
    events.noteoff.forEach((evt) => evt({ channel, note, velocity }));
  }
};

type OffFunction = () => void;

export const on = (
  event: SpecialMidiKeys | "noteon" | "noteoff",
  cb: (note: Note) => void
): OffFunction => {
  events[event].push(cb);

  return () => {
    const idx = events[event].findIndex((e) => e === cb);
    events[event].splice(idx, 1);
  };
};
