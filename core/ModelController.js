import { Controller } from "./Controller.js";
import { Model } from "./Model.js";

export class ModelController extends Controller {
  onChange = {};

  constructor({ onChange, ...props } = {}) {
    super(props);
    this.setOnChange(onChange);
  }

  setChild(model) {
    if (model) {
      this.child = new Model(model);
      this.child.setController(this);
    }
  }

  setOnChange(onChange) {
    if (!onChange) return;

    this.onChange = onChange;
  }
}
