import { Events } from "../../core/Events.js";
import { ViewModelWrapper } from "../../core/controller_wrapper.js";
import { PagesController } from "./controller.js";

export class PagesControllerWrapper extends ViewModelWrapper {
  protected controller: PagesController;

  constructor({
    children,
  }: {
    children?: { [key: string]: ViewModelWrapper };
  }) {
    const controller = new PagesController();

    super({ children, controller });

    this.controller = controller;
  }

  initEvents() {
    return {
      [Events.MODEL.ADD_PAGE_TO_MODEL]: this.controller.view.append.bind(
        this.controller.view
      ),
      [Events.MODEL.TABLIST_CHANGE]: this.controller.model.addPage.bind(
        this.controller.model
      ),
    };
  }
}
