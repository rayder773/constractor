export class Module {
  hooks = {};
  parent = null;
  subscribeTo = {};

  constructor({ hooks, parent, subscribeTo } = {}) {
    this.setHooks(hooks);
    this.setParent(parent);
    this.setSubscribeTo(subscribeTo);
  }

  setSubscribeTo(subscribeTo) {
    if (subscribeTo) {
      this.subscribeTo = subscribeTo;
    }
  }

  setHooks(hooks) {
    if (hooks) {
      this.hooks = hooks;
    }
  }

  setParent(parent) {
    if (parent) {
      this.parent = parent;
    }
  }

  getParent() {
    return this.parent;
  }

  append() {
    this.hooks?.append();
  }

  remove() {
    this.hooks?.remove();
  }

  trigger(event, data) {
    if (this.parent) {
      this.parent.trigger(event, data);
    }
  }

  subscribe() {}
}
