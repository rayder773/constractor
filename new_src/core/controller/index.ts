import { Parent } from "../Parent.js";
import { Model } from "../model/index.js";
import { View } from "../view/index.js";

export class ViewModel extends Parent {
  view: View;
  model: Model;

  constructor({ view, model }: { view: View; model: Model }) {
    super({ children: { view, model } });
    this.view = view;
    this.model = model;
  }

  getViewRoot() {
    return this.view.getRoot();
  }

  start() {
    this.view.create();
  }

  renderView() {
    this.view.render();
  }

  appendToViewElement(params: { [key: string]: HTMLElement }) {
    for (let name in params) {
      this.view.appendToActiveElement(name, params[name]);
    }
  }

  stop() {}
}
