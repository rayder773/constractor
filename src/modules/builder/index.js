import { Grid } from "../grid/index.js";
import { Tabs } from "../tabs/index.js";
import { BuilderModel } from "./model.js";
import { BuilderView } from "./view.js";

export function Builder() {
  const tabs = Tabs();
  const grid = Grid();

  const view = BuilderView({
    tabsView: tabs.getTabsView(),
    gridView: grid.getGridView(),
  });

  const model = BuilderModel({
    tabsModel: tabs.getTabsModel(),
    gridModel: grid.getGridModel(),
  });

  const module = Object.freeze({
    ...view,
    ...model,
    getBuilderView() {
      return view;
    },
    getBuilderModel() {
      return model;
    },
  });

  return module;
}
