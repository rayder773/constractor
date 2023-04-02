import { ViewModelWrapper } from "../../core/controller_wrapper.js";
import { PagesController } from "./controller.js";

export class PagesControllerWrapper extends ViewModelWrapper {
  constructor({
    children,
  }: {
    children?: { [key: string]: ViewModelWrapper };
  }) {
    super({ children, controller: new PagesController() });
  }
}
