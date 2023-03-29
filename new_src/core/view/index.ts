import { Child } from "../Child.js";
import { ViewInterface } from "./interface.js";

export class View extends Child implements ViewInterface {
  activeElements: {
    [key: string]: { element: HTMLElement; listeners: Function[] };
  } = {};

  rootElement: HTMLElement | null = null;

  constructor() {
    super();
  }

  create(children: { [key: string]: HTMLElement } = {}) {
    return {};
  }

  start(children: any = {}) {
    const { rootElement, activeElements } = createElement(
      this.create(children)
    );

    this.rootElement = rootElement;
    this.activeElements = activeElements;

    return rootElement;
  }
}

function createElement(schema = {}): {
  rootElement: HTMLElement;
  activeElements: {
    [key: string]: { element: HTMLElement; listeners: Function[] };
  };
} {
  console.log(schema);

  return {
    rootElement: document.createElement("div"),
    activeElements: {},
  };
}
