import { ViewWithModel } from "../core/ViewWithModel.js";
export class MainPage extends ViewWithModel {
    constructor({ builderView }) {
        super();
        this.builder = builderView;
    }
    createElement() {
        const element = document.createElement("div");
        element.id = "main-page";
        this.appendChild(this.builder, element);
        return element;
    }
}
