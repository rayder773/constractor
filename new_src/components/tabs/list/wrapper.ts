import { Events } from "../../../core/Events.js";
import { ViewModelWrapper } from "../../../core/controller_wrapper.js";
import { TabsListController } from "./controller.js";

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
  }

  initEvents() {
    return {
      addTab: this.controller.model.addTab.bind(this.controller.model),
      [Events.MODEL.TABLIST_CHANGE]: this.controller.view.append.bind(
        this.controller.view
      ),
    };
  }
}
