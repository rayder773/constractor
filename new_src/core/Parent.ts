import { Child } from "./Child.js";

export class Parent extends Child {
  children: {
    [key: string]: Child;
  };

  constructor({ children = {} }: { children: { [key: string]: Child } }) {
    super();
    this.children = children;
  }

  isRoot(): boolean {
    return this.parent === null;
  }
}
