import { View } from "../common/view.js";

export function BuilderView({ tabsView, gridView } = {}) {
  const view = View();

  view.addChild(tabsView);
  view.addChild(gridView);

  return Object.freeze({
    ...tabsView,
    ...gridView,
    ...view,
    createBuilderElement() {
      const container = document.createElement("div");
      container.id = "builder";

      const tabsElement = tabsView.createTabsElement();
      container.append(tabsElement);

      return container;
    },
  });
}
