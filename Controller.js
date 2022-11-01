import { Entity } from "./Entity.js";

export class Controller extends Entity {
  child = null;

  constructor({ child, ...props } = {}) {
    super(props);
    this.setChild(child);
  }

  setChild(child) {}

  ring(radio) {
    this.parent.ring(radio);
  }

  change(data) {
    this.child.change(data);
  }
}
