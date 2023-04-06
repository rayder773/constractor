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

  initEvents(): { [key: string]: Function } {
    return {};
  }

  initChild() {
    let lastParent: Child | any = this;

    while (lastParent.getParent()) {
      lastParent = lastParent.getParent();
    }

    const events = this.initEvents();

    for (let event in events) {
      lastParent.on(event, events[event]);
    }
  }

  getParent(): Parent | null {
    return this.parent;
  }

  emit(event: string, ...args: any[]): void {
    let lastParent: Child | any = this;

    while (lastParent.getParent()) {
      lastParent = lastParent.getParent();
    }

    lastParent.subscribtions[event]?.forEach((callback: any) =>
      callback(...args)
    );
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
