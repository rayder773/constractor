import { Entity } from "./Entity.js";

export class Component extends Entity {
  childrenById = {};
  compose = true;
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

  addChild({ child, id = this.generateId(), data }) {
    if (!child) return;

    child = child();
    child.setParent(this);
    child.setId(id);
    this.childrenById[id] = child;
    child.start(data);
  }

  tell(eventName, params) {
    if (!Object.keys(this.childrenById).length) return;

    for (let id in this.childrenById) {
      if (this.childrenById[id].compose) {
        this.childrenById[id].tell(eventName, params);
      }

      if (this.childrenById[id].listen[eventName]) {
        this.childrenById[id].listen[eventName].call(
          this.childrenById[id],
          params
        );
      }
    }
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

  start(data) {
    if (!this.children) return;

    this.children.forEach((child) => {
      this.addChild({ child });
    });

    super.start(data);

    delete this.children;
  }

  generateId() {
    let lastId =
      Object.keys(this.childrenById)[
        Object.keys(this.childrenById).length - 1
      ] || -1;

    return parseInt(lastId) + 1;
  }
}
