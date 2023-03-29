import { ViewModel } from "../../core/controller/index.js";
import { BuilderModel } from "./model.js";
import { BuilderView } from "./view.js";
export class Builder extends ViewModel {
    constructor() {
        super({ view: new BuilderView(), model: new BuilderModel(), children: {} });
    }
}
