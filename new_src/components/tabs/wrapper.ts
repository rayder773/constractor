import { ViewModelWrapper } from "../../core/controller_wrapper.js";
import { TabsController } from "./controller.js";

export class TabsControllerWrapper extends ViewModelWrapper {
  constructor({
    children,
  }: {
    children?: { [key: string]: ViewModelWrapper };
  }) {
    super({ controller: new TabsController(), children });
  }
}
