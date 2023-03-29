import { Parent } from "../Parent.js";
export class ViewModel extends Parent {
    constructor({ view, model, children = {}, }) {
        super({ children });
        this.view = view;
        this.model = model;
    }
    start() {
        // this.view.render();
    }
    stop() {
        // this.view.remove();
    }
}
