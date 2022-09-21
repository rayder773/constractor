export class Frame {
  events = {};

  constructor({ modules = {} } = {}) {
    this.modules = modules;
  }

  setModules() {}

  trigger(event, data) {}

  subscribe(event, cb) {}
}
