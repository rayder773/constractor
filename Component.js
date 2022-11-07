import { Entity } from "./Entity.js";
import { defaultEvents, getObjectKey } from "./utils.js";

export class Component extends Entity {
  children = [];
  subscribtions = {};

  constructor({ children, ...props } = {}) {
    super(props);
    this.setChildren(children);
  }

  setChildren(children) {
    if (!children || !Array.isArray(children)) return;

    this.children = children;
  }

  start() {
    this.initChildren();
    super.start();

    // this.bubble({})
    // console.log(this);
  }

  initChildren() {
    if (!this.children) return;

    // console.log(this);
    // debugger;

    // console.log(this.children);

    this.children = this.children.map((child) => {
      // debugger;
      child = this.app.addEntity(child);
      child.setParent(this);

      if (child.bubbleEvents.parentStarted) {
        child.bubbleEvents.parentStarted.call(child);
      }
      // console.log(child);

      return child;
    });

    // debugger;

    // delete this.children;
  }
}
