export class Entity {
  parent = null;
  id = null;
  types = [];
  info = [];
  app = null;

  globalEvents = {};
  bubbleEvents = {};

  constructor({ globalEvents, types, bubbleEvents }) {
    this.setGlobalEvents(globalEvents);
    this.setTypes(types);
    this.setBubbleEvents(bubbleEvents);
  }

  addInfo(newInfo) {
    if (!newInfo) return;
    this.info.push(newInfo);
  }

  setBubbleEvents(bubbleEvents) {
    if (!bubbleEvents) return;

    this.bubbleEvents = bubbleEvents;
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

  start() {
    if (this.types) {
      this.types.forEach((t) => {
        this.globalRing({ system: { [`${t}:started`]: this } });
      });
    }
  }

  globalRing(radio) {
    if (this.app) {
      this.app.globalRing(radio);
    }
  }

  addEntity(entity) {
    if (this.app) {
      this.app.addEntity(entity);
    }
  }

  applyBubbles(entity) {
    if (entity.parent) {
      this.applyBubbles(entity.parent);
    }
  }

  bubble(events) {
    for (let name in events) {
      this.applyBubbles(this);
    }
  }
}
