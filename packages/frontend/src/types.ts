// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type EventData = any;
export type EventCallback = (data: EventData) => void;
export type MessageTypes = "message" | "connection";

export interface ServerObject {
  url: string;
  on: (evt: MessageTypes, cb: EventCallback) => void;
  off: (evt: MessageTypes, cb?: EventCallback) => void;
  send: (eventType: string, msg: EventData) => void;
  destroy: () => void;
}
