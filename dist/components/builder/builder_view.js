import { View } from "../../core/View.js";
export class BuilderView extends View {
    constructor({ tabsComponent }) {
        super();
        this.tabsComponent = tabsComponent;
    }
    createElement() {
        const element = document.createElement("div");
        element.id = "builder";
        return element;
    }
}
