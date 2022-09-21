export class Module {
  constructor({ name = "", children = {}, data = {}, frame = null } = {}) {
    if (!name) {
      throw new Error("you can not create module without name");
    }
    this.name = name;
    this.children = children;
    this.parent = null;
    this.data = data;
    this.frame = frame;
  }

  setParent(parent) {
    if (!parent || !(parent instanceof Module)) {
      throw new Error("parent can not be undefined");
    }

    this.parent = parent;
  }

  setFrame(frame) {
    Object.assign(this.frame || {}, frame);
  }

  addToFrame(module) {
    this.frame[module.getName()] = module;

    module.setFrame(this.frame);
  }

  getFrame() {
    return this.frame;
  }

  getName() {
    return this.name;
  }

  getParent() {
    return this.parent;
  }

  add(module) {
    if (!(module instanceof Module)) {
      throw new Error("you can set only module like child");
    }

    module.setParent(this);

    const moduleName = module.getName();

    if (this.frame[moduleName]) {
      throw new Error("module with this name is exists already");
    }

    if (this.frame) {
      this.addToFrame(module);
    }

    this.children[moduleName] = module;

    return this;
  }
}

export class DOMElement extends Module {
  constructor(html, ...props) {
    super(...props);
    this.html = props;
    console.log(props);
  }

  add() {}
}
