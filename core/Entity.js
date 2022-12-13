import { toCapitalCase } from "../utils.js";

export class Entity {
  listen = {};
  name = "";

  constructor({ hooks, listen, name } = {}) {
    this.setHooks(hooks);
    this.setListen(listen);
    this.setName(name);
  }

  setName(name) {
    if (!name) return;

    this.name = name;
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

  setId(id) {
    if (typeof id === undefined || id === null) return;

    this.id = id;
  }

  start(data) {
    if (this.hooks?.onStarted) {
      if (typeof this.hooks.onStarted === "string") {
      } else if (typeof this.hooks.onStarted === "function") {
        this.hooks.onStarted.call(this, data);
      }
    }
  }
}
