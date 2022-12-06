import { toCapitalCase } from "../utils.js";

export class Entity {
  listen = {};

  constructor({ hooks, listen } = {}) {
    this.setHooks(hooks);
    this.setListen(listen);
  }

  setListen(listen) {
    if (!listen) return;

    this.listen = listen;
  }

  setHooks(hooks) {
    if (!hooks) return;

    this.hooks = hooks;
  }

  setParent(parent) {
    if (parent) {
      this.parent = parent;
    }
  }

  ask(...props) {
    if (this.parent) {
      this.parent.ask(...props);
    }
  }

  start() {
    if (this.hooks?.onStarted) {
      if (typeof this.hooks.onStarted === "string") {
      } else if (typeof this.hooks.onStarted === "function") {
        typeof this.hooks.onStarted.call(this);
      }
    }
  }
}
