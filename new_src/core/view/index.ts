import { Child } from "../Child.js";
import { ViewInterface } from "./interface.js";

export class View extends Child implements ViewInterface {
  elementNames: { [key: string]: string };

  elementEventNames: { [key: string]: string };

  activeElements: {
    [key: string]: HTMLElement;
  };

  events: {
    [key: string]: {
      [key: string]: "string";
    };
  };

  rootElement: HTMLElement;

  constructor() {
    super();
    this.rootElement = document.createElement("div");
    this.events = {};
    this.activeElements = {};
    this.elementNames = {};
    this.elementEventNames = {};
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

  getActiveElement(name: string) {
    if (!this.activeElements[name]) {
      throw new Error(`Element with name ${name} not found`);
    }

    return this.activeElements[name];
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

    if (schema.text) {
      element.textContent = schema.text;
    }

    if (schema.name) {
      params.activeElements[schema.name] = element;

      if (schema.events) {
        for (let eventName in schema.events) {
          if (!this.events[schema.name]) this.events[schema.name] = {};

          this.events[schema.name][eventName] = schema.events[eventName];
        }
      }
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

    this.onRender();
  }

  onRender() {
    this.addEventListener();
  }

  onRemove() {
    this.removeEventListener();
  }

  addEventListener() {
    for (let elementName in this.events) {
      const element = this.activeElements[elementName];

      for (let eventName in this.events[elementName]) {
        const eventType = this.events[elementName][eventName];

        this.handleEvent(element, eventName, eventType);
      }
    }
  }

  handleEvent(element: HTMLElement, eventName: string, eventType: string) {
    element.addEventListener(eventName, this.onEvent.bind(this, eventType));
  }

  onEvent(eventType: string, e: Event) {
    this.emit(eventType, e);
  }

  removeEventListener() {}
}
