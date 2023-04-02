import { ViewInterface } from "./interface.js";

export class View implements ViewInterface {
  activeElements: {
    [key: string]: HTMLElement;
  };

  rootElement: HTMLElement;

  constructor() {
    this.rootElement = document.createElement("div");
    this.activeElements = {};
  }

  appendToActiveElement(name: string, element: HTMLElement) {
    if (!this.activeElements[name]) {
      throw new Error(`Element with name ${name} not found`);
    }

    this.activeElements[name].append(element);
  }

  getRoot() {
    return this.rootElement;
  }

  html(): {} {
    return {};
  }

  createFromSchema(
    schema: any,
    params: any = {
      activeElements: {},
    }
  ) {
    const element = document.createElement(schema.tag);

    if (schema.attributes) {
      for (let name in schema.attributes) {
        element.setAttribute(name, schema.attributes[name]);
      }
    }

    if (schema.name) {
      params.activeElements[schema.name] = element;
    }

    if (schema.ch) {
      schema.ch.forEach((child: any) => {
        const childElement = this.createFromSchema(child, params);
        element.appendChild(childElement.rootElement);
      });
    }

    params.rootElement = element;

    return params;
  }

  create() {
    const { rootElement, activeElements } = this.createFromSchema(this.html());

    this.activeElements = activeElements;
    this.rootElement = rootElement;
  }

  render(parent: HTMLElement = document.body) {
    parent.append(this.rootElement);
  }
}
