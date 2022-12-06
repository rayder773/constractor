export class Child {
  controller = null;

  constructor() {}

  setController(controller) {
    if (controller) {
      this.controller = controller;
    }
  }
}
