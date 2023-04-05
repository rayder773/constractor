import { Parent } from "./Parent.js";

export class Child {
  protected parent: Parent | null;
  protected subscribtions: { [key: string]: Function[] };

  constructor() {
    this.parent = null;
    this.subscribtions = {};
  }

  setParent(parent: Parent | null): void {
    this.parent = parent;
  }

  getParent(): Parent | null {
    return this.parent;
  }

  emit(event: string, ...args: any[]): void {
    let parent = this.getParent();

    while (parent) {
      this.exec.call(parent, event, ...args);
      parent = parent.getParent();
    }
  }

  exec(event: string, ...args: any[]): void {
    this.subscribtions[event]?.forEach((callback) => callback(...args));
  }

  on(event: string, callback: Function): void {
    if (!this.subscribtions[event]) {
      this.subscribtions[event] = [];
    }

    this.subscribtions[event].push(callback);
  }
}
