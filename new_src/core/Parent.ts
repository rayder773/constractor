import { Child } from "./Child.js";

export class Parent extends Child {
  protected children: { [key: string]: Child };

  constructor({ children = {} }: { children?: { [key: string]: Child } }) {
    super();

    this.children = children;

    for (const childName in children) {
      children[childName].setParent(this);
    }
  }

  addChild(name: string, child: Child): void {
    this.children[name] = child;
    child.setParent(this);
  }

  removeChild(name: string): void {
    delete this.children[name];
  }

  initChildren(): void {
    for (const name in this.children) {
      this.children[name].initChild();
    }
  }
}
