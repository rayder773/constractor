import { Parent } from "./parent.js";

const EVENT = {
  RENDER: "RENDER",
};

export function View() {
  return Object.freeze({
    ...Parent(),
    getEvents() {
      return EVENT;
    },
    render(params) {
      const { parent = document.body, child } = params;

      if (typeof child === "undefined") {
        throw new Error("Child element is undefined");
      }

      parent.append(child);

      this.notify(EVENT.RENDER);

      this.recursiveNotifyChildren(EVENT.RENDER);
    },
  });
}
