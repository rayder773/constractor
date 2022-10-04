export class Frame {
  _modules = null;
  _events = {};

  constructor({ modules = {} } = {}) {
    this.modules = modules;
  }

  set modules(modules) {
    this._modules = modules;
    for (let key in modules) {
      let m = modules[key]();

      m.frame = this;

      this._modules[key] = m;

      for (let eventName in m.listen) {
        this.setEvent(eventName, m);
      }

      while (m.modules) {
        const modulesCopy = m.modules;
        for (let key in modulesCopy) {
          m = m.modules[key]();
          m.frame = this;
          this._modules[key] = m;

          for (let eventName in m.listen) {
            this.setEvent(eventName, m);
          }
        }
      }
    }
  }

  setModule(name, module) {
    this._modules[name] = module;
  }

  setEvent(event, module) {
    if (!this._events[event]) {
      this._events[event] = [];
    }

    this._events[event].push(module);
  }

  trigger(eventName, data) {
    if (this._events[eventName] && Array.isArray(this._events[eventName])) {
      this._events[eventName].forEach((el) => {
        if (el.listen && el.listen[eventName]) {
          el.listen[eventName].call(el, data);
        }
      });
    }
  }
}
