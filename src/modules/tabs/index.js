import { TabsModel } from "./model.js";
import { TabsView } from "./view.js";

export function Tabs() {
  const view = TabsView();
  const model = TabsModel();

  const module = Object.freeze({
    ...view,
    getTabsView() {
      return view;
    },
    getTabsModel() {
      return model;
    },
  });

  view.onTabElementRender(() => {
    document.getElementById("add-tab-button").addEventListener("click", () => {
      model.addTab();
    });
  });

  model.onNewTab(view.appendNewTabElement.bind(view));

  return module;
}
