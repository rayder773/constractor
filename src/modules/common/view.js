import { EventEmmiter } from "./event_emmiter.js";

const EVENT = {
  RENDER: "RENDER",
};

export function View() {
  let children = [];

  return Object.freeze({
    ...EventEmmiter(),
    render(params) {
      const { parent = document.body, child } = params;

      if (typeof child === "undefined") {
        throw new Error("Child element is undefined");
      }

      parent.append(child);

      this.notify(EVENT.RENDER);

      if (children.length > 0) {
        children.forEach((child) => {
          child.notify(EVENT.RENDER);
        });
      }
    },
    addChild(child) {
      if (!children.includes(child)) {
        children.push(child);
      }
    },
  });
}
