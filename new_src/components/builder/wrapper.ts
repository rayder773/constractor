import { ViewModel } from "../../core/controller/index";
import { ViewModelWrapper } from "../../core/controller_wrapper.js";

export class BuilderControllerWrapper extends ViewModelWrapper {
  childrenNames = {
    tabs: "tabs",
    pages: "pages",
  };

  constructor(params: {
    controller: ViewModel;
    children?: { [key: string]: ViewModelWrapper };
  }) {
    super(params);
  }

  start() {
    super.start();

    const tabs = this.getChildByName(this.childrenNames.tabs);
    const pages = this.getChildByName(this.childrenNames.pages);

    this.controller.appendToViewElement({
      tabs: tabs.getControllerViewRoot(),
      pages: pages.getControllerViewRoot(),
    });
  }
}
