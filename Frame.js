import { Module } from "./Module.js";

export class Frame extends Module {
  modules = {};
  connector = {};
  events = {};

  constructor({ modules, connector, ...props } = {}) {
    super(props);
    this.setModules(modules);
    this.setConnector(connector);
  }

  setModules(modules) {
    if (modules) {
      for (let name in modules) {
        const module = modules[name];

        module.setParent(this);

        for (let name in module.subscribeTo) {
          this.events[name] = module.subscribeTo[name];
        }
      }

      this.modules = modules;
    }
  }

  setConnector(connector) {
    if (connector) {
      this.connector = connector;
    }
  }

  start() {
    for (let moduleName in this.modules) {
      this.modules[moduleName].append();
    }
  }

  finish() {
    for (let moduleName in this.modules) {
      this.modules[moduleName].remove();
    }
  }

  trigger(eventName, data) {
    let events = this.connector[eventName];

    if (!events) return;

    if (!Array.isArray(events)) {
      events = [events];
    }

    events.forEach((e) => {
      if (this.events[e]) {
        this.events[e](data);
      }
    });
  }
}
