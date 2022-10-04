import { Controller } from "./Controller.js";
import { Model } from "./Model.js";

export class ModelController extends Controller {
  constructor({ modelChanges, ...props } = {}) {
    super(props);
    this.setModelChanges(modelChanges);
  }

  setChild(model) {
    if (model) {
      this.child = new Model(model);
      this.child.setController(this);
    }
  }

  setComponent(component) {
    super.setComponent(component);
    this.initModelChanges();
  }

  setModelChanges(modelChanges) {
    if (modelChanges) {
      this.modelChanges = modelChanges;
    }
  }

  initModelChanges() {
    for (let modelEventName in this.modelChanges) {
      for (let fieldName in this.modelChanges[modelEventName]) {
        if (this.child.data[fieldName] !== undefined) {
          console.log(11);
        }
      }
      // change: {
      //   title(data) {
      //     console.log("this", this);
      //     console.log("data", data);
      //   },
      // },
    }
  }

  trigger() {}
}
