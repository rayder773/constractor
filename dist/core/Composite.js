export class Composite {
    constructor() {
        this.children = [];
        this.parent = null;
    }
    add(child) {
        this.children.push(child);
        child.setParent(this);
    }
    remove(child) {
        const index = this.children.indexOf(child);
        if (index === -1) {
            return;
        }
        this.children.splice(index, 1);
        child.setParent(null);
    }
    isRoot() {
        return this.parent === null;
    }
    setParent(parent) {
        this.parent = parent;
    }
}
