export class Entity {
  constructor() {
    this.parent = null;
    this.frame = this;
    this.children = {};
    this.name = "";
  }

  addChildren(children) {
    for (let childName in children) {
      if (this.children[childName]) {
        console.error(`child with name ${childName} already exist`);
        continue;
      }

      this.children[childName] = children[childName];
    }

    return this;
  }

  getChildren() {
    return this.children;
  }

  setFrame(frame) {
    this.frame = frame;
    return this;
  }

  getFrame() {
    return this.frame;
  }

  setParent(parent) {
    this.parent = parent;
    return this;
  }

  getParent() {
    return this.parent;
  }

  trigger() {}

  subscribe() {}
}

export class Component extends Entity {
  constructor({ viewModel = {}, events = {} } = {}) {
    super();

    this.viewModel = viewModel;
    this.events = events;
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

  add(components) {
    for (let componentName in components) {
      const component = new Component(components[componentName]);
    }
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

  trigger(eventName, data) {
    this.frame.trigger(eventName, data);
  }

  subscribe(eventName, cb) {
    this.frame.subscribe(eventName, cb);
  }
}
