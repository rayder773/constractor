import { Controller } from "./Controller.js";
import { View } from "./View.js";

export class ViewController extends Controller {
  userEvents = {};

  constructor({ userEvents, ...props } = {}) {
    super(props);
    this.setUserEvents(userEvents);
  }

  setChild(view) {
    if (view) {
      this.child = new View(view);
      this.child.setController(this);
    }
  }

  initUserEvents() {
    for (let elementName in this.userEvents) {
      const element = this.child.$(elementName);

      if (element) {
        const events = this.userEvents[elementName];

        for (let eventName in events) {
          const cb = events[eventName];
          element.addEventListener(eventName, cb.bind(this.component));
        }
      }
    }
  }

  setComponent(component) {
    super.setComponent(component);
    this.initUserEvents();
  }

  setUserEvents(userEvents) {
    if (userEvents) {
      this.userEvents = userEvents;
    }
  }
}
