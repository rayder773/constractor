import { ViewModel } from "../../core/controller/index.js";
import { TabsModel } from "./model.js";
import { TabsView } from "./view.js";

export class TabsController extends ViewModel {
  model: TabsModel;
  view: TabsView;

  constructor() {
    const model = new TabsModel();
    const view = new TabsView();

    super({ view, model });

    this.model = model;
    this.view = view;
  }
}
