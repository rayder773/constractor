import { View } from "../common/view.js";

export function BuilderView({ tabsView } = {}) {
  return Object.freeze({
    ...View(),
    createBuilderElement() {
      const container = document.createElement("div");
      container.id = "builder";

      const tabsElement = tabsView.createTabsElement();
      container.append(tabsElement);

      return container;
    },
  });
}
