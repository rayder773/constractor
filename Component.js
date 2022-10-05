import { getObjectKey } from "./utils.js";

export class Component {
  controllers = null;
  channels = {};
  components = null;
  parent = null;
  hooks = null;

  constructor({ controllers, components, hooks, channels } = {}) {
    this.setChannels(channels);
    this.setControllers(controllers);
    this.setComponents(components);
    this.setHooks(hooks);
  }

  setChannels(channels) {
    if (channels) {
      this.channels = channels;
    }
  }

  setHooks(hooks) {
    if (hooks) {
      this.hooks = hooks;

      if (hooks.append) {
        hooks.append.call(this);
      }
    }
  }

  setParent(parent) {
    if (parent) {
      this.parent = parent;
    }
  }

  setChannels(channels) {
    if (channels) {
      this.channels = channels;
    }
  }

  setComponents(components) {
    if (components) {
      for (let name in components) {
        if (typeof components[name] === "function") {
          components[name] = components[name]({ channels: this.channels });
          components[name].setParent(this);
        }
      }

      this.components = components;
    }
  }

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
