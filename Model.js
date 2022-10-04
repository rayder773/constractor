import { Child } from "./Child.js";

export class Model extends Child {
  data = null;
  controller = null;

  constructor({ data } = {}) {
    super();
    this.set(data);
  }

  change(values) {
    for (let name in values) {
      if (!this.data[name]) {
        throw new Error("");
      }

      this.data[name] = values[name];
      this.notify({ change: name });
    }
  }

  pushToArray(field, element) {
    if (!this.data[field] || !Array.isArray(this.data[field])) {
      throw new Error(``);
    }

    this.data[field].push(element);
    this.notify({ pushToArray: field });
  }

  set(data) {
    if (!data) {
      throw new Error(``);
    }

    this.data = data;
    this.notify({ set: "data" });
  }

  notify(event) {
    // this.controller.trigger();
    // const listeners = this.listeners[event];
    // if (listeners) {
    //   listeners.forEach((cb) => cb(this.data));
    // }
  }

  // listen(event, cb) {
  //   if (!this.listeners[event]) {
  //     this.listeners[event] = [];
  //   }

  //   this.listeners[event].push(cb);
  // }
}
