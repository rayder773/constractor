import { GridModel } from "./model.js";
import { GridView } from "./view.js";

export function Grid() {
  const view = GridView();
  const model = GridModel();

  const module = Object.freeze({
    getGridModel() {
      return model;
    },
    getGridView() {
      return view;
    },
  });

  return module;
}
