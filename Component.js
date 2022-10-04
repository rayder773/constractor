import { getObjectKey } from "./utils.js";

export class Component {
  controllers = null;
  channels = {};

  constructor({ controllers } = {}) {
    // this.setModules(modules);
    this.setControllers(controllers);
  }

  // setModules(modules) {
  //   if (modules) {
  //     for (let name in modules) {
  //       modules[name] = modules[name]();
  //     }

  //     this.modules = modules;
  //   }
  // }

  setControllers(controllers) {
    if (controllers) {
      for (let name in controllers) {
        if (typeof controllers[name] === "function") {
          controllers[name] = controllers[name]();
          controllers[name].setComponent(this);
        }
      }

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
