export class Controller {
  systemEvents = {};
  component = null;
  child = null;

  constructor({ child, systemEvents } = {}) {
    this.setChild(child);
    this.setSystemEvents(systemEvents);
  }

  setComponent(component) {
    if (component) {
      this.component = component;
      this.initSystemEvents();
    }
  }

  initSystemEvents() {
    this.component.subscribe(this.systemEvents, this);
  }

  setSystemEvents(systemEvents) {
    if (systemEvents) {
      this.systemEvents = systemEvents;
    }
  }

  setChild(child) {}

  ring(radio) {
    this.component.ring(radio);
  }

  change(data) {
    this.child.change(data);
  }
}
