export class View {
  component = null;
  children = {};
  modelEvents = {};

  constructor({ component, modelEvents } = {}) {
    this.setComponent(component);
    this.setModelEvents(modelEvents);
    this.setChildren();
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
    return this.children[name];
  }

  setComponent(component) {
    if (!component) return;

    this.component = component;
  }

  change(components) {
    for (let componentName in components) {
      const component = this.children[componentName];

      if (!component) continue;

      for (let prop in components[componentName]) {
        if (!this.props[prop]) continue;

        this.props[prop].call(component, components[componentName][prop]);
      }
    }
  }

  setChildren() {
    this.children.root = this.component;
    const children = this.component.querySelectorAll("[name]");

    if (!children?.length) return;

    Array.from(children).forEach((c) => {
      const name = c.getAttribute("name");

      if (this.children[name]) {
        throw new Error("already exist");
      }

      this.children[name] = c;
    });
  }

  trigger(event, data) {
    if (this.modelEvents[event]) {
      this.modelEvents[event].call(this, data);
    }
  }

  setModelEvents(events) {
    this.modelEvents = events;
  }
}

export class Model {
  data = {};
  views = {};

  constructor({ data } = {}) {
    this.setData(data);
  }

  setData(data) {
    if (!data) return;

    this.data = data;
  }

  registerViews(views) {
    for (let name in views) {
      if (this.views[name]) {
        throw new Error(`view with name ${name} already registered`);
      } else {
        this.views[name] = views[name];
      }
    }
  }
}

const appComponent = new View({
  component: document.getElementById("app"),
  modelEvents: {
    someEvent(data) {
      this.change({
        main: {
          text: data,
        },
      });
    },
  },
});

const routerModel = new Model({
  data: {
    page: "homePage",
  },
  viewEvents: {},
});

routerModel.registerViews({ appComponent });

appComponent.trigger("someEvent", "222");

// console.log(routerModel);

// console.log("appComponent", appComponent);
