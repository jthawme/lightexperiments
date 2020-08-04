import { Board, Led } from "johnny-five";

export const connectBoard = (): Promise<Board> => {
  const board = new Board({
    repl: false,
  });
  return new Promise((resolve) => {
    board.on("ready", () => {
      resolve(board);
    });
  });
};

export * as BlinkTest from "./interactions/blinkTest";
export { Led };

export type BoardOutput = Board;
