import { Child } from "./Child.js";
export class Parent extends Child {
    constructor({ children = {} }) {
        super();
        this.children = children;
    }
    isRoot() {
        return this.parent === null;
    }
}
