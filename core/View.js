import { Child } from "./Child.js";
import { Entity } from "./Entity.js";

export class View extends Child {
  children = {};

  constructor({ component } = {}) {
    super();
    this._setComponent(component);
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
        if (!Array.isArray(data)) {
          data = [data];
        }
        data.forEach((el) => {
          const newEl = self._setViewModel(el);
          this.append(newEl);
        });
      },
      content(data) {
        this.innerHTML = "";
        this.append(data);
      },
      contentModel(data, self) {
        this.innerHTML = "";
        const newEl = self._setViewModel(data);
        this.append(newEl);
      },
      childByIndex(data, self) {
        for (let index in data) {
          if (this.children[index] && data[index]) {
            self._setProps(data[index], this.children[index]);
          }
        }
      },
      title(data) {
        this.title = data;
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

  get root() {
    return this.children.root;
  }

  $(name) {
    return this.children[name];
  }

  _setComponent(component) {
    if (!component) return;

    if (component instanceof HTMLElement || component instanceof HTMLDocument) {
      const elements = component.querySelectorAll("[name]");

      if (elements) {
        Array.from(elements).forEach((el) => {
          this.children[el.getAttribute("name")] = el;
        });
      }

      this.children.root = component;
    } else if (typeof component === "string") {
    } else {
      this.children.root = this._setViewModel(component);
    }
  }

  _setViewModel(element) {
    const tag = Object.keys(element)[0];
    let component = document.createElement(tag);

    const elProps = element[tag];

    if (elProps.name) {
      this.children[elProps.name] = component;
    }

    this._setProps(elProps, component);

    return component;
  }

  _setProps(elProps, component) {
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
        this._setProps(elements[elementName], element);
      }
    }
  }
}
