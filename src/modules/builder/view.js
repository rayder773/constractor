import { View } from "../common/view.js";

export function BuilderView({ tabsView, pagesView } = {}) {
  const view = View();

  view.addChild(tabsView);
  view.addChild(pagesView);

  return Object.freeze({
    ...tabsView,
    ...pagesView,
    ...view,
    createBuilderElement() {
      const container = document.createElement("div");
      container.id = "builder";

      const tabsElement = tabsView.createTabsElement();
      container.append(tabsElement);

      const pagesElement = pagesView.createPagesListElement();
      container.append(pagesElement);

      return container;
    },
  });
}
