import { Board, Led } from "johnny-five";

export const connectBoard = (): Promise<Board | null> => {
  const board = new Board({
    repl: false,
  });

  const readyBoard = (): Promise<Board> => {
    return new Promise((resolve) => {
      board.on("ready", () => {
        resolve(board);
      });
    });
  };

  const timeoutBoard = (): Promise<null> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(null), 3000);
    });
  };

  return Promise.race([readyBoard(), timeoutBoard()]);
};

export * as BlinkTest from "./interactions/blinkTest";
export { Led };

export type BoardOutput = Board;
