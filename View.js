import { Module } from "./Module.js";

export class View extends Module {
  component = null;
  elements = {};
  children = {};

  constructor({ component, ...props } = {}) {
    super(props);
    this.setComponent(component);
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
    return this.elements[name];
  }

  setComponent(component) {
    if (!component) return;

    if (component instanceof HTMLElement) {
      const elements = component.querySelectorAll("[name]");

      if (elements) {
        Array.from(elements).forEach((el) => {
          this.children[el.getAttribute("name")] = el;
        });
      }

      this.component = component;
    } else if (typeof component === "string") {
    } else {
      this.component = this.setViewModel(component);
    }
  }

  setViewModel(element) {
    const tag = Object.keys(element)[0];
    let component = document.createElement(tag);

    const elProps = element[tag];

    if (elProps.name) {
      this.children[elProps.name] = component;
    }

    this.setProps(elProps, component);

    return component;
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
}
