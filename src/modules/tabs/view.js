import { View } from "../common/view.js";

export function TabsView() {
  return Object.freeze({
    ...View(),
    createTabsElement() {
      const container = document.createElement("div");
      container.id = "tabs";

      const listElement = document.createElement("ul");
      listElement.id = "tabs-list";
      container.append(listElement);

      const addButtonElement = document.createElement("button");
      addButtonElement.textContent = "+";
      addButtonElement.id = "add-tab-button";
      container.append(addButtonElement);

      return container;
    },
    onTabElementRender(cb) {
      this.addListener(this.getEvents().RENDER, cb);
    },
    appendNewTabElement(data) {
      const listElement = document.getElementById("tabs-list");

      const tabElement = document.createElement("li");
      tabElement.id = "tab-" + data.id;
      tabElement.textContent = data.name;
      listElement.append(tabElement);
    },
  });
}
