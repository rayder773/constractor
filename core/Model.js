import { Child } from "./Child.js";

export class Model extends Child {
  data = null;

  constructor({ data } = {}) {
    super();
    this.set(data);
  }

  get props() {
    return {
      addToArray({ fieldName, data }) {
        this.data[fieldName].push(data);
      },
    };
  }

  change(values) {
    for (let fieldName in values) {
      for (let methodName in values[fieldName]) {
        const data = values[fieldName][methodName];
        if (data !== undefined && this.data[fieldName] !== undefined) {
          this.props[methodName].call(this, { fieldName, data });

          const d = this.controller.onChange[fieldName].addToArray;

          if (typeof d === "string") {
            this.controller.ask(d, data);
          }
        }
      }
    }
  }

  set(data) {
    if (!data) {
      throw new Error(``);
    }
    this.data = data;
  }
}
