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

  set(field, values) {
    for (let key in values) {
    }
  }
}

export class ViewModule extends Module {
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

  create(element = this._model._data) {
    const tag = Object.keys(element)[0];
    let component = document.createElement(tag);

    const elProps = element[tag];

    if (elProps.name) {
      this.names[elProps.name] = component;
    }

    for (let propName in elProps) {
      if (props[propName] && elProps[propName]) {
        props[propName].call(component, elProps[propName]);
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
}

var props = {
  text(data) {
    this.textContent = data;
  },
  appendTo(data) {
    data.append(this);
  },
};

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
