import { Pages } from "../pages/index.js";
import { Tabs } from "../tabs/index.js";
import { BuilderModel } from "./model.js";
import { BuilderView } from "./view.js";

export function Builder() {
  const tabs = Tabs();
  const pages = Pages();

  const view = BuilderView({
    tabsView: tabs.getTabsView(),
    pagesView: pages.getPagesView(),
  });

  const model = BuilderModel({
    tabsModel: tabs.getTabsModel(),
    pagesModel: pages.getPagesModel(),
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
