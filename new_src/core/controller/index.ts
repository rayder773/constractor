import { Parent } from "../Parent.js";
import { Model } from "../model/index.js";
import { View } from "../view/index.js";

export class ViewModel extends Parent {
  view: View;
  model: Model;

  constructor({
    view,
    model,
    children = {},
  }: {
    view: View;
    model: Model;
    children: { [key: string]: ViewModel };
  }) {
    super({ children });
    this.view = view;
    this.model = model;
  }

  start() {
    // this.view.render();
  }

  stop() {
    // this.view.remove();
  }
}
