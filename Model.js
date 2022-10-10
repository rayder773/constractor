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
      set({ fieldName, data }) {
        this.controller.notify({
          methodName: "set",
          fieldName,
          dataInfo: {
            oldValue: this.data[fieldName],
            newValue: data,
            model: this.data,
          },
        });

        this.data[fieldName] = data;
      },
    };
  }

  change(values) {
    for (let fieldName in values) {
      for (let methodName in values[fieldName]) {
        const data = values[fieldName][methodName];
        if (data !== undefined && this.data[fieldName] !== undefined) {
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
