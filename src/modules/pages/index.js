import { ActiveElement } from "../active_element/index.js";
import { Grid } from "../grid/index.js";
import { PagesModel } from "./model.js";
import { PagesView } from "./view.js";

export function Pages() {
  const grid = Grid();
  const activeElement = ActiveElement();

  const activeElementModel = activeElement.getActiveElementModel();

  const gridModel = grid.getGridModel();
  const gridView = grid.getGridView();

  const view = PagesView({ gridView });
  const model = PagesModel({ gridModel });

  view.addListener("RENDER", () => {
    view.onActivePageElementClick((e) => {
      console.log(e.target);
    });
  });

  const module = Object.freeze({
    ...view,
    ...model,
    getPagesView() {
      return view;
    },
    getPagesModel() {
      return model;
    },
  });

  model.onNewPage(view.renderPagesItemElement.bind(view));

  return module;
}
