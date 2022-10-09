import { Child } from "./Child.js";

export class Model extends Child {
  data = null;
  controller = null;

  constructor({ data } = {}) {
    super();
    this.set(data);
  }

  get props() {
    return {
      addToArray({ fieldName, data }) {
        if (!Array.isArray(this.data[fieldName])) {
          throw new Error("must be array");
        }
        this.data[fieldName].push(data);
        this.controller.notify({
          methodName: "addToArray",
          fieldName,
          dataInfo: {
            newElement: data,
          },
        });
      },
    };
  }

  change(values) {
    for (let fieldName in values) {
      for (let methodName in values[fieldName]) {
        const data = values[fieldName][methodName];
        if (data && this.data[fieldName]) {
          this.props[methodName].call(this, { fieldName, data });
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
