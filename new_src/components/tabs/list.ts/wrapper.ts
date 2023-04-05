import { ViewModelWrapper } from "../../../core/controller_wrapper.js";
import { TabsListController } from "./index.js";

export class TabsListControllerWrapper extends ViewModelWrapper {
  protected controller: TabsListController;

  constructor({
    children,
  }: {
    children?: { [key: string]: ViewModelWrapper };
  }) {
    const controller = new TabsListController();

    super({ controller, children });

    this.controller = controller;

    this.on("addTab", this.controller.model.addTab.bind(this.controller.model));
    this.on("change", this.controller.view.append.bind(this.controller.view));
  }
}
