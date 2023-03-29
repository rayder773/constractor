import { Composite } from "../Composite.js";
export class ViewModel extends Composite {
    constructor({ view, model }) {
        super();
        this.view = view;
        this.model = model;
    }
}
