export class Entity {
  constructor() {
    this.parent = null;
    this.frame = this;
  }

  setFrame(frame) {
    this.frame = frame;
  }

  setParent(parent) {
    this.parent = parent;
  }

  trigger() {}

  subscribe() {}
}

export class Component extends Entity {
  constructor({ viewModel = {}, events = {} } = {}) {
    super();

    this.viewModel = viewModel;
    this.events = events;

    this.children = {};
    this.html = null;
  }

  get props() {
    return {
      text(data) {
        this.textContent = data;
      },
      appendTo(data) {
        this.append(data);
      },
      href(data) {
        this.href = data;
      },
      append(data, self) {
        data.forEach((el) => {
          const newEl = self.setViewModel(el);
          this.append(newEl);
        });
      },
      content(data) {
        this.innerHTML = "";
        this.append(data);
      },
      style(data) {
        for (let key in data) {
          if (typeof this.style[key] !== undefined) {
            this.style[key] = data[key];
          }
        }
      },
    };
  }

  $(name) {
    if (this.children[name]) {
      return this.children[name];
    }
  }

  create() {
    this.html = this.setViewModel();
  }

  setProps(elProps, component) {
    for (let propName in elProps) {
      if (this.props[propName] && elProps[propName]) {
        this.props[propName].call(component, elProps[propName], this);
      }
    }
  }

  change(elements) {
    for (let elementName in elements) {
      const element = this.children[elementName];

      if (element) {
        this.setProps(elements[elementName], element);
      }
    }
  }

  setViewModel(element = this.viewModel) {
    const tag = Object.keys(element)[0];
    let component = document.createElement(tag);

    const elProps = element[tag];

    if (elProps.name) {
      this.children[elProps.name] = component;
    }

    this.setProps(elProps, component);

    return component;
  }

  setEvents() {
    if (!window.events) window.events = [];

    for (let eventName in this.events) {
      if (!window.events.includes(eventName)) {
        window.events.push(eventName);

        let timeout;

        window.addEventListener(
          eventName,
          (e) => {
            if (timeout) {
              window.cancelAnimationFrame(timeout);
            }

            timeout = window.requestAnimationFrame(() =>
              this.events[eventName].call(this, e)
            );
          },
          false
        );
      }
    }
  }
}
