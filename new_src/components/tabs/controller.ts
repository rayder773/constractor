import { ViewModel } from "../../core/controller/index.js";
import { TabsModel } from "./model.js";
import { TabsView } from "./view.js";

export class TabsController extends ViewModel {
  constructor() {
    super({
      view: new TabsView(),
      model: new TabsModel(),
    });
  }
}
