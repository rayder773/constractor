import { Model } from "../model/index.js";
import { View } from "../view/index.js";

export class ViewModel {
  view: View;
  model: Model;
  children: { [key: string]: ViewModel } = {};

  constructor({ view, model }: { view: View; model: Model }) {
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
