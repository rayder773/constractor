import { Entity } from "./Entity.js";

export class Component extends Entity {
  children = [];
  proxy = {};

  constructor({ children, proxy, ...props } = {}) {
    super(props);
    this.setChildren(children);
    this.setProxy(proxy);
  }

  setChildrenCommands(childrenCommands) {
    if (!childrenCommands) return;

    this.childrenCommands = childrenCommands;
  }

  setProxy(proxy) {
    if (!proxy) return;

    this.proxy = proxy;
  }

  setChildren(children) {
    if (!children) return;

    this.children = children;
  }

  tell(eventName, params) {
    if (!this.children.length) return;

    this.children.forEach((child) => {
      if (child.children) {
        child.tell(eventName, params);
      }

      if (child.listen[eventName]) {
        child.listen[eventName].call(child, params);
      }
    });
  }

  ask(eventName, params) {
    const proxy = this.proxy[eventName];

    if (proxy) {
      if (typeof proxy === "string") {
        this.tell(proxy, params);
      } else if (typeof proxy === "function") {
        proxy(params);
      }
    }

    const listen = this.listen[eventName];

    if (listen) {
      if (typeof listen === "string") {
        this.tell(listen, params);
      } else if (typeof listen === "function") {
        listen.call(this, params);
      }
    }

    super.ask(eventName, params);
  }

  createChild(child) {
    child = child();
    child.setParent(this);

    return child;
  }

  addChild({ child, data, id }) {
    const createdChild = this.createChild(child);
    createdChild.setId(id);
    this.children.push(createdChild);

    this.initEntity(createdChild);
    this.startEntity(createdChild, data);
  }

  startEntity(entity = this, data) {
    if (entity.children) {
      entity.children.forEach((child) => {
        this.startEntity(child, data);
      });
    }

    entity.start(data);
  }

  initEntity(entity = this) {
    if (!entity.children) return;

    entity.children.forEach((child, i) => {
      child = entity.createChild(child);

      entity.children[i] = child;

      if (child.children) {
        child.initEntity();
      }
    });
  }
}
