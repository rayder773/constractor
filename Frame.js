import { Component } from "./Component.js";
import { Entity } from "./Entity.js";
import { HTMLtoObject } from "./utils.js";

export class Frame extends Entity {
  constructor({ modules = {}, view = null, events = {}, ...props } = {}) {
    super(props);
    this.events = events;
    this.modules = modules;
    this.view = view;
  }

  initView() {
    if (this.view instanceof HTMLElement) {
      const viewModel = HTMLtoObject(this.view);
      this.view = new Component({ viewModel });
      // console.log(viewModel);
    } else if (
      typeof this.view === "object" &&
      Object.keys(this).length !== undefined
    ) {
      // this.v;
    }
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
