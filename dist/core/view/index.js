import { Child } from "../Child.js";
export class View extends Child {
    constructor() {
        super();
        this.activeElements = {};
        this.rootElement = null;
        this.create();
    }
    setActiveElement({ key, element }) {
        this.activeElements[key] = {
            element,
            listeners: [],
        };
    }
    create(children = {}) {
        // return document.createElement("div");
    }
    start() {
        // this.addListeners();
    }
    render({ parent = document.body } = {}) {
        // this.start();
        // const element = this.create();
        // parent.appendChild(element);
    }
    remove() {
        // this.removeListeners();
        // this.activeElements = {};
    }
    addListeners() { }
    removeListeners() { }
}
