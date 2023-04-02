import { ViewModel } from "../../core/controller/index.js";
import { PagesModel } from "./model.js";
import { PagesView } from "./view.js";

export class PagesController extends ViewModel {
  constructor() {
    super({
      view: new PagesView(),
      model: new PagesModel(),
    });
  }
}
