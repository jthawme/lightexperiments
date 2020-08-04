import exitHook from "exit-hook";
import { connectBoard } from "./index";
import blinkTest from "./interactions/blinkTest";
import { CleanupFunction } from "./common";

let cleanup: CleanupFunction | null = null;

connectBoard().then(() => {
  cleanup = blinkTest();
});

exitHook(() => {
  if (cleanup) {
    cleanup();
  }
});
