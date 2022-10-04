export class Component {
  children = null;
  constructor({ children } = {}) {
    this.setChildren(children);
  }

  setChildren(children) {
    if (children) {
      children.forEach((c) => {
        c.setParent(this);
      });

      this.children = children;
    }
  }
}
