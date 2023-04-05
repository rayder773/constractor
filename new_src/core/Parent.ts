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

  redirect(event: string, ...args: any[]): void {
    this.on(event, this.checkChildren.bind(this, event, ...args));
  }

  checkChildren(event: string, ...args: any[]): void {
    for (let name in this.children) {
      const child = this.children[name];

      child.exec(event, ...args);

      if (child instanceof Parent) {
        child.checkChildren(event);
      }
    }
  }
}
