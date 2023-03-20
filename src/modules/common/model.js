import { EventEmmiter } from "./event_emmiter.js";
import { Parent } from "./parent.js";

export function Model() {
  return Object.freeze({
    ...EventEmmiter(),
    ...Parent(),
  });
}
