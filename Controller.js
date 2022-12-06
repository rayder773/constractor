import { Entity } from "./Entity.js";

export class Controller extends Entity {
  child = null;

  constructor({ child, commands, ...props } = {}) {
    super(props);
    this.setChild(child);
    this.setCommands(commands);
  }

  setCommands(commands) {
    if (!commands) return;

    this.commands = commands;
  }

  change(data) {
    this.child.change(data);
  }

  setChild() {}
}
