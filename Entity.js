export class Entity {
  parent = null;
  id = null;
  types = [];
  info = [];
  app = null;

  globalEvents = {};
  localEvents = {};

  constructor({ globalEvents, localEvents, types }) {
    this.setGlobalEvents(globalEvents);
    this.setLocalEvents(localEvents);
    this.setTypes(types);
  }

  addInfo(newInfo) {
    if (!newInfo) return;
    this.info.push(newInfo);
  }

  setParent(parent) {
    if (parent) {
      this.parent = parent;
    }
  }

  setApp(app) {
    if (app) {
      this.app = app;
    }
  }

  setTypes(types) {
    if (types) {
      if (!Array.isArray(types)) {
        types = [types];
      }
      this.types = types;
    }
  }

  setId(id) {
    if (typeof id !== "undefined") {
      this.id = id;
    }
  }

  setGlobalEvents(globalEvents) {
    if (globalEvents) {
      Object.assign(this.globalEvents, globalEvents);
    }
  }

  setLocalEvents(localEvents) {
    if (localEvents) {
      Object.assign(this.localEvents, localEvents);
    }
  }

  start() {}

  globalRing(radio) {
    if (this.app) {
      this.app.globalRing(radio);
    }
  }
}
