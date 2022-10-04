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
    this.component.subscribe(this.systemEvents, this.child);
  }

  setSystemEvents(systemEvents) {
    if (systemEvents) {
      this.systemEvents = systemEvents;
    }
  }

  setChild(child) {}
}
