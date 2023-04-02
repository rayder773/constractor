import { ViewModel } from "../../core/controller/index.js";
import { MainPageModel } from "./model.js";
import { MainPageView } from "./view.js";

export class MainPage extends ViewModel {
  constructor() {
    super({
      view: new MainPageView(),
      model: new MainPageModel(),
    });
  }
}
