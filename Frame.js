import { Entity } from "./Component.js";

export class Frame extends Entity {
  constructor({ name = "", modules = {}, view = null, events = {} } = {}) {
    this.events = events;
    this.name = name;
    this.modules = modules;
    this.view = view;
  }

  subscribe(eventName, cb) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(cb);
  }

  trigger(eventName, data) {
    const events = this.events[eventName];

    if (events?.length) {
      events.forEach((cb) => cb(data));
    }
  }
}
