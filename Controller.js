export class Controller {
  systemEvents = {};
  childChanges = {};
  component = null;
  child = null;

  constructor({ child, systemEvents, childChanges } = {}) {
    this.setChild(child);
    this.setSystemEvents(systemEvents);
    this.setChildChanges(childChanges);
  }

  setChildChanges(childChanges) {
    if (childChanges) {
      this.childChanges = childChanges;
    }
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

  notify(data) {
    const { methodName, fieldName, dataInfo } = data;

    if (this.childChanges[fieldName]) {
      if (this.childChanges[fieldName][methodName]) {
        this.childChanges[fieldName][methodName].call(this, dataInfo);
      }
    }
  }
}
