import { View } from "./View.js";
export class ViewWithModel extends View {
    constructor(...args) {
        super(...args);
        this.state = {};
    }
}
