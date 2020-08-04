import { Led } from "johnny-five";
import { CleanupFunction } from "../common";

export default (): CleanupFunction => {
  const led = new Led(13);
  led.blink(500);

  return () => {
    led.off();
  };
};
