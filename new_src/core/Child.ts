import { Parent } from "./Parent.js";

export class Child {
  parent: Parent | null;

  constructor() {
    this.parent = null;
  }

  setParent(parent: Parent | null): void {
    this.parent = parent;
  }
}
