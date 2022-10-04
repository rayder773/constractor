import { Module } from "./Module.js";

export class Frame extends Module {
  modules = {};
  connector = {};
  events = {};
  exportEvents = null;

  constructor({ modules, connector, exportEvents, ...props } = {}) {
    super(props);
    this.setModules(modules);
    this.setConnector(connector);
    this.setExportEvents(exportEvents);
  }

  setExportEvents(events) {
    if (events) {
      this.exportEvents = events;
    }
  }

  setModules(modules) {
    if (modules) {
      for (let name in modules) {
        const module = modules[name];

        module.setParent(this);

        for (let name in module.subscribeTo) {
          this.events[name] = {
            module,
            cb: module.subscribeTo[name],
          };
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

  start(modules = this.modules) {
    for (let moduleName in modules) {
      if (modules[moduleName].modules) {
        this.start(modules[moduleName].modules);
      }
      modules[moduleName].append();
    }
  }

  finish(modules = this.modules) {
    for (let moduleName in modules) {
      if (modules[moduleName].modules) {
        this.finish(modules[moduleName].modules);
      }
      modules[moduleName].remove();
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
        this.events[e].cb.call(this.events[e].module, data);
      }
    });
  }
}
