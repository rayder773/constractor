import { Parent } from "./Parent.js";
import { ViewModel } from "./controller/index.js";

export class ViewModelWrapper extends Parent {
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
    super({ children });

    this.children = children;
    this.controller = controller;
    this.childrenNames = {};

    controller.setParent(this);
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

  render() {
    this.controller.renderView();

    this.informViewChildrenOnRender();
  }

  informViewChildrenOnRender() {
    for (let name in this.children) {
      this.children[name].informViewChildrenOnRender();
      this.children[name].controller.view.onRender();
    }
  }

  getControllerViewRoot() {
    return this.controller.getViewRoot();
  }

  getControllerModel() {
    return this.controller.model;
  }
}
