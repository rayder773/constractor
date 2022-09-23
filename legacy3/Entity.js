export class Entity {
  constructor({ name } = {}) {
    this.parent = null;
    this.frame = this;
    this.children = {};
    this.name = name;
  }

  addChildren(children) {
    for (let childName in children) {
      if (this.children[childName]) {
        console.error(`child with name ${childName} already exist`);
        continue;
      }

      this.children[childName] = children[childName];
    }

    return this;
  }

  getChildren() {
    return this.children;
  }

  setFrame(frame) {
    this.frame = frame;
    return this;
  }

  getFrame() {
    return this.frame;
  }

  setParent(parent) {
    this.parent = parent;
    return this;
  }

  getParent() {
    return this.parent;
  }

  setName(name) {
    this.name = name;
    return this;
  }

  getName() {
    return this.name;
  }

  trigger() {}

  subscribe() {}
}
