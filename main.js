document.documentElement.events = [];

function createElement(tag = "div", props = "") {
  const element = document.createElement(tag);

  for (let key in props) {
    if (!props[key] || !elementProps[key]) continue;

    elementProps[key].call(element, props[key]);
  }

  return element;
}

var elementProps = {
  children(data) {
    if (!Array.isArray(data)) return;

    data.forEach((child) => {
      this.append(child);
    });
  },
  text(data) {
    this.textContent = data;
  },
  name(data) {
    this.setAttribute("data-name", data);
  },
};

function setNames(container) {
  const namedElements = container.querySelectorAll("[data-name]");
  const result = {};

  if (container.dataset.name) {
    result[container.dataset.name] = container;
  }

  Array.from(namedElements).forEach((el) => {
    result[el.dataset.name] = el;
  });

  return result;
}

function div(props) {
  return createElement("div", props);
}

const test = div({
  text: 228,
  name: "parent",
  children: [
    div({
      text: "child_1",
      name: "child_1",
      children: [div({ name: "child_1-1", text: "child_1-1" })],
    }),
  ],
});

class View {
  constructor(template, styles) {
    this.nameToElement = {};
    this.template = template;
    this.nameToStyle = styles;
    this.setNames();
    this.setStyles();
  }

  $(name) {
    return this.nameToElement[name];
  }

  setNames() {
    const namedElements = this.template.querySelectorAll("[data-name]");

    if (this.template.dataset.name) {
      this.nameToElement[this.template.dataset.name] = this.template;
    }

    Array.from(namedElements).forEach((el) => {
      this.nameToElement[el.dataset.name] = el;
    });

    return this;
  }

  setStyles() {
    if (!this.nameToStyle) return;

    for (let elementName in this.nameToStyle) {
      const styles = this.nameToStyle[elementName];

      for (let styleName in styles) {
        this.nameToElement[elementName].style[styleName] = styles[styleName];
      }
    }

    return this;
  }

  appendTo(parent) {
    if (typeof parent === "string") {
      parent = document.querySelector(parent);
    }

    if (!parent) {
      return console.warn("no element found");
    }

    parent.append(this.template);

    return this;
  }

  append(names) {
    for (let key in names) {
      const element = this.nameToElement[key];

      if (!element) {
        console.warn("no element in template");
        continue;
      }

      let newChild = names[key];

      if (newChild instanceof HTMLElement) {
        newChild = new View(newChild);
      }

      element.append(newChild.template);
    }

    return this;
  }
}

class Component {
  constructor({ view, commands, models, systemEvents }) {
    this.view = view;
    this.commands = commands;
    this.models = models;
    this.systemEvents = systemEvents;

    this.setCommands();
  }

  setCommands() {
    const html = document.documentElement;

    for (let elementName in this.commands) {
      const element = this.view.$(elementName);
      element.component = this;

      if (!element.events) {
        element.events = {};
      }

      const events = this.commands[elementName];

      for (let eventName in events) {
        element.events[eventName] = events[eventName];

        if (!html.events.includes(eventName)) {
          html.events.push(eventName);
          html.addEventListener(eventName, (e) => {
            const systemEvents = e.target.events;

            if (!systemEvents && !systemEvents?.[eventName]) return;

            this.systemEvents[systemEvents[eventName]](this.models);
          });
        }
      }
    }
  }
}

const view = new View(test, {
  parent: {
    color: "red",
  },
  child_1: {
    color: "green",
  },
});

const viewComponent = new Component({
  view,
  models: {
    user: {},
  },
  state: {
    default: {},
  },
  client: {
    trigger: {
      parent: {
        click: "onParentClick",
        mouseover: {
          default: "onParentMouseOver",
          different: "onParentMouseOver__different",
        },
      },
    },
    listen: {
      onParentClick(models) {},
    },
  },
  appState: {
    listen: {
      userNameChanges(view) {},
    },
  },
  newtwork: {
    listen: {
      someDataFetched(models) {},
    },
  },
});

view.appendTo(document.body);
