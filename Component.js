import { getObjectKey } from "./utils.js";

export class Component {
  controllers = [];

  entities = {};

  channels = {};
  parent = null;

  //как хранить компоненты
  //вариант 1 в {}
  components = [];
  //вариант 2 в []
  // componentsArr = [];

  constructor({ controllers, components, systemEvents } = {}) {
    // this.setChannels(channels);
    this.setControllers(controllers);
    this.setComponents(components);
    // this.setHooks(hooks);
    this.setSystemEvents(systemEvents);
  }

  // addComponent(component) {
  //   if (component) {
  //     component = component();
  //     component.setParent(this);
  //     component.addChannels(this.channels);
  //     this.componentsArr.push(component);
  //   }
  // }

  // addControllers(controllers) {
  //   for (let name in controllers) {
  //     if (this.controllers[name]) {
  //       throw new Error(`controller with name ${name} already exists`);
  //     } else {
  //       const c = controllers[name]();
  //       c.setComponent(this);
  //       this.ring({ system: [`${name}:append`] });
  //     }
  //   }
  //   // if(this.c)
  // }

  // addChannels(channels) {
  //   if (channels) {
  //     Object.assign(this.channels, channels);
  //   }
  // }

  // initSystemEvents() {
  //   if (this.systemEvents) {
  //     this.subscribe(this.systemEvents, this);
  //   }
  // }

  setSystemEvents(systemEvents) {
    if (systemEvents) {
      this.subscribe(systemEvents, this);
    }
  }

  // setChannels(channels) {
  //   if (channels) {
  //     this.channels = channels;
  //   }
  // }

  // setHooks(hooks) {
  //   if (hooks) {
  //     this.hooks = hooks;
  //   }
  // }

  // initHooks() {
  //   if (this.hooks.append) {
  //     this.hooks.append.call(this);
  //   }
  // }
  // setParent(parent) {
  //   if (parent) {
  //     this.parent = parent;
  //     this.start();
  //   }
  // }

  start() {
    this.initControllers();
    this.initComponents();
    // this.initHooks();
    // this.initSystemEvents();
  }

  // setChannels(channels) {
  //   if (channels) {
  //     this.channels = channels;
  //   }
  // }

  // initComponents() {
  //   if (!this.components) return;

  //   for (let name in this.components) {
  //     if (typeof this.components[name] === "function") {
  //       this.components[name] = this.components[name]();
  //       this.components[name].addChannels(this.channels);
  //       this.components[name].setParent(this);
  //     }
  //   }
  // }

  setComponents(components) {
    if (components) {
      this.components = components;
    }
  }

  initComponents() {
    if (!this.components) return;

    this.components.forEach((component) => {
      if (typeof component === "function") {
        this.addEntities(component);
      }
    });

    delete this.component;
  }

  initControllers() {
    if (!this.controllers) return;

    this.controllers.forEach((controller) => {
      if (typeof controller === "function") {
        this.addEntities(controller);
      }
    });

    delete this.controllers;
  }

  addEntities(entities) {
    if (!entities) return;

    if (!Array.isArray(entities)) {
      entities = [entities];
    }

    entities.forEach((entity) => {
      entity = entity();

      const lastId =
        Object.keys(this.entities)[Object.keys(this.entities).length - 1] || -1;

      const newId = parseInt(lastId) + 1;

      entity.setComponent(this);
      entity.setId(newId);

      if (entity.types) {
        entity.types.forEach((type) => {
          this.ring({ system: [{ [`${type}:append`]: entity }] });
        });
      }
    });
  }

  setControllers(controllers) {
    if (controllers) {
      this.controllers = controllers;
    }
  }

  ring(radio) {
    for (let channelName in radio) {
      const events = radio[channelName];

      if (events && this.channels[channelName]) {
        events.forEach((eventData) => {
          if (typeof eventData === "string") {
            const eventListeners = this.channels[channelName][eventData];

            if (eventListeners) {
              eventListeners.forEach(({ cb, child }) => {
                cb.call(child);
              });
            }
          } else {
            const eventName = getObjectKey(eventData);
            const eventListeners = this.channels[channelName][eventName];

            if (eventListeners) {
              eventListeners.forEach(({ cb, child }) => {
                cb.call(child, eventData[eventName]);
              });
            }
          }
        });
      }
    }
  }

  subscribe(radio, child) {
    for (let channelName in radio) {
      if (!this.channels[channelName]) {
        this.channels[channelName] = {};
      }

      for (let eventName in radio[channelName]) {
        if (!this.channels[channelName][eventName]) {
          this.channels[channelName][eventName] = [];
        }

        this.channels[channelName][eventName].push({
          cb: radio[channelName][eventName],
          child,
        });
      }
    }
  }
}
