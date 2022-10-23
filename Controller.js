export class Controller {
  systemEvents = {};
  // childChanges = {};
  component = null;
  // child = null;
  types = [];
  id = null;

  constructor({ child, systemEvents, types } = {}) {
    this.setSystemEvents(systemEvents);
    this.setTypes(types);
    this.setChild(child);
    // this.setChildChanges(childChanges);
  }

  setTypes(types) {
    if (types) {
      if (!Array.isArray(types)) {
        types = [types];
      }
      this.types = types;
    }
  }

  setSystemEvents(systemEvents) {
    if (systemEvents) {
      this.systemEvents = systemEvents;
    }
  }

  setChild(child) {}

  setId(id) {
    if (typeof id !== "undefined") {
      this.id = id;
    }
  }

  // setChildChanges(childChanges) {
  //   if (childChanges) {
  //     this.childChanges = childChanges;
  //   }
  // }

  setComponent(component) {
    if (component) {
      this.component = component;
      this.component.subscribe(this.systemEvents, this);
      // this.initSystemEvents();
    }
  }

  // initSystemEvents() {
  //   this.component.subscribe(this.systemEvents, this);
  // }

  ring(radio) {
    this.component.ring(radio);
  }

  change(data) {
    this.child.change(data);
  }

  // notify(data) {
  //   const { methodName, fieldName, dataInfo } = data;

  //   if (this.childChanges[fieldName]) {
  //     if (this.childChanges[fieldName][methodName]) {
  //       this.childChanges[fieldName][methodName].call(this, dataInfo);
  //     }
  //   }
  // }
}
