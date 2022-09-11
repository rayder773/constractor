export class Module {
  _frame = null;
  _events = null;
  _model = null;
  names = {};

  constructor({ data = {}, events = {}, listen = {} } = {}) {
    this.data = data;
    this._events = events;
    this.listen = listen;
  }

  set data(data) {
    if (data) {
      this._model = new Model(data);
      this._model.onChange = (data) => {
        for (let key in this._events) {
          const res = this._events[key](data);

          if (res) {
            this._frame.trigger(key, data);
          }
        }
      };
    }
  }

  set frame(frame) {
    this._frame = frame;
  }

  trigger(...args) {
    this._frame.trigger(...args);
  }
}

export class ViewModule extends Module {
  props = {
    text(data) {
      this.textContent = data;
    },
    appendTo(data) {
      this.append(data);
    },
    href(data) {
      this.href = data;
    },
    append(data) {
      this.append(data);
    },
    content(data) {
      this.innerHTML = "";
      this.append(data);
    },
  };

  constructor({ view = {}, ...props } = {}) {
    super(props);
    this.view = view;
  }

  set view(view) {
    if (!window.events) {
      window.events = [];
    }

    const { element, events } = view;

    for (let eventName in events) {
      if (!window.events.includes(eventName)) {
        window.events.push(eventName);

        let timeout;

        window.addEventListener(
          eventName,
          (e) => {
            if (timeout) {
              window.cancelAnimationFrame(timeout);
            }

            timeout = window.requestAnimationFrame(() => {
              this._model.data = events[eventName](e);
            });
          },
          false
        );
      }
    }
  }

  decoratorCreate(element = this._model._data) {
    const component = this.create(element);
    this.component = component;
    return this;
  }

  create(element = this._model._data) {
    const tag = Object.keys(element)[0];
    let component = document.createElement(tag);

    const elProps = element[tag];

    if (elProps.name) {
      this.names[elProps.name] = component;
    }

    for (let propName in elProps) {
      if (this.props[propName] && elProps[propName]) {
        this.props[propName].call(component, elProps[propName]);
      } else if (propName == "ch") {
        const children = elProps.ch;

        children.forEach((el) => {
          const newEl = this.create(el);
          component.append(newEl);
        });
      }
    }

    return component;
  }

  change(dataObj = {}) {
    for (let tagName in dataObj) {
      const elProps = dataObj[tagName];

      if (elProps.element && elProps.name) {
        this.names[elProps.name] = elProps.element;
        delete elProps.element;
      }

      if (elProps.ch?.length) {
        elProps.ch.forEach((c) => {
          this.change(c);
        });
      }
    }

    this.data = dataObj;
  }

  set(values) {
    for (let name in values) {
      if (this.names[name]) {
        for (let prop in values[name]) {
          if (this.props[prop]) {
            this.props[prop].call(this.names[name], values[name][prop]);
          }
        }
      }
    }
  }
}

class Model {
  _data = null;

  constructor(data) {
    this.data = data;
  }

  trigger() {
    this.events;
  }

  set data(data) {
    this._data = data;
    this.onChange(data);
  }

  onChange() {}
}
