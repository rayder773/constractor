import { ViewModel } from "./controller/index.js";

export class ViewModelWrapper {
  protected controller: ViewModel;
  protected children: { [key: string]: ViewModelWrapper };
  readonly childrenNames: { [key: string]: string };

  constructor({
    controller,
    children = {},
  }: {
    controller: ViewModel;
    children?: { [key: string]: ViewModelWrapper };
  }) {
    this.controller = controller;
    this.children = children;
    this.childrenNames = {};
  }

  getChildByName(name: string) {
    if (!this.children[name]) {
      throw new Error(`Child with name ${name} not found`);
    }

    return this.children[name];
  }

  start() {
    this.controller.start();

    for (let name in this.children) {
      this.children[name].start();
    }
  }

  getControllerViewRoot() {
    return this.controller.getViewRoot();
  }
}
