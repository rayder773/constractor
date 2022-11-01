export class App {
  children = [];
  childrenById = {};
  globalSubscribrions = {};

  constructor({ children } = {}) {
    this.setChildren(children);
  }

  setChildren(children) {
    if (!children) return;

    this.children = children;
  }

  generateId() {
    let lastId =
      Object.keys(this.childrenById)[
        Object.keys(this.childrenById).length - 1
      ] || -1;

    return parseInt(lastId) + 1;
  }

  addEntity(entity) {
    entity = entity();

    const id = this.generateId();

    entity.setId(id);
    entity.setApp(this);

    for (let channelName in entity.globalEvents) {
      const channels = entity.globalEvents[channelName];

      if (!this.globalSubscribrions[channelName]) {
        this.globalSubscribrions[channelName] = {};
      }

      for (let eventName in channels) {
        if (!this.globalSubscribrions[channelName][eventName]) {
          this.globalSubscribrions[channelName][eventName] = [];
        }

        this.globalSubscribrions[channelName][eventName].push(entity.id);
        entity.addInfo([channelName, eventName]);
      }
    }

    this.childrenById[id] = entity;

    return entity;
  }

  start() {
    if (!this.children) return;

    this.children.forEach((child) => {
      child = this.addEntity(child);
      child.start();
    });

    // debugger;

    this.globalRing({ system: "app:started" });

    delete this.children;
  }

  globalRing(radio) {
    for (let channelName in radio) {
      let events = radio[channelName];

      if (!Array.isArray(events)) {
        events = [events];
      }

      events.forEach((e) => {
        let eventName = e;

        if (typeof eventName !== "string") {
          eventName = Object.keys(e)[0];
        }

        if (this.globalSubscribrions?.[channelName]?.[eventName]) {
          this.globalSubscribrions[channelName][eventName].forEach((id) => {
            if (this.childrenById[id].globalEvents[channelName][eventName]) {
              let params = [this.childrenById[id]];

              if (e[eventName]) {
                params.push(e[eventName]);
              }

              this.childrenById[id].globalEvents[channelName][eventName].call(
                ...params
              );
            }
          });
        }
      });
    }
    // debugger;
  }
}
