import { Controller } from "./Controller.js";
import { View } from "./View.js";

export class ViewController extends Controller {
  userEvents = {};

  constructor({ userEvents, ...props } = {}) {
    super(props);
  }

  setChild(view) {
    if (view) {
      this.child = new View(view);
      this.child.setController(this);
    }
  }
}
