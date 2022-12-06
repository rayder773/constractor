import { Controller } from "./Controller.js";
import { View } from "./View.js";

export class ViewController extends Controller {
  clientEvents = {};

  constructor({ clientEvents, ...props } = {}) {
    super(props);
    this.setClientEvents(clientEvents);
  }

  setClientEvents(clientEvents) {
    if (!clientEvents) return;

    this.clientEvents = clientEvents;
  }

  setChild(view) {
    if (view) {
      this.child = new View(view);
      this.child.setController(this);
    }
  }
}
