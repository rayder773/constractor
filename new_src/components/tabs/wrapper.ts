import { ViewModelWrapper } from "../../core/controller_wrapper.js";
import { TabsController } from "./controller.js";
import { TabsListControllerWrapper } from "./list.ts/wrapper.js";

export class TabsControllerWrapper extends ViewModelWrapper {
  constructor({
    children,
  }: {
    children?: { [key: string]: ViewModelWrapper };
  }) {
    super({
      controller: new TabsController(),
      children: { ...children, list: new TabsListControllerWrapper({}) },
    });
  }

  start() {
    super.start();

    const list = this.getChildByName("list");

    this.controller.appendToViewElement({
      tabsList: list.getControllerViewRoot(),
    });
  }
}
