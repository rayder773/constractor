import { ViewModel } from "../../core/controller/index.js";
import { View } from "../../core/view/index";
import { PagesModel } from "./model.js";
import { PagesView } from "./view.js";

export class PagesController extends ViewModel {
  view: PagesView;
  model: PagesModel;

  constructor() {
    const view = new PagesView();
    const model = new PagesModel();

    super({
      view,
      model,
    });

    this.view = view;
    this.model = model;
  }
}
