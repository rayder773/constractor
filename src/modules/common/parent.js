import { EventEmmiter } from "./event_emmiter.js";

export function Parent() {
  let children = [];

  return Object.freeze({
    ...EventEmmiter(),
    recursiveNotifyChildren(eventName) {
      children.forEach((child) => {
        child.notify(eventName);
        child.recursiveNotifyChildren(eventName);
      });
    },
    addChild(child) {
      if (!children.includes(child)) {
        children.push(child);
      }
    },
    getChildren() {
      return children;
    },
  });
}
