import { Child } from "../Child.js";
import { ViewInterface } from "./interface.js";

export class View extends Child implements ViewInterface {
  activeElements: {
    [key: string]: { element: HTMLElement; listeners: Function[] };
  } = {};

  rootElement: HTMLElement | null = null;

  constructor() {
    super();
    this.create();
  }

  setActiveElement({ key, element }: { key: string; element: HTMLElement }) {
    this.activeElements[key] = {
      element,
      listeners: [],
    };
  }

  create(children: { [key: string]: HTMLElement } = {}) {
    // return document.createElement("div");
  }

  start() {
    // this.addListeners();
  }

  render({ parent = document.body }: { parent?: HTMLElement } = {}): void {
    // this.start();
    // const element = this.create();
    // parent.appendChild(element);
  }

  remove() {
    // this.removeListeners();
    // this.activeElements = {};
  }

  addListeners() {}

  removeListeners() {}
}
