import { TabsView } from "./view.js";

export function Tabs() {
  const view = TabsView();

  const module = Object.freeze({
    ...view,
    getTabsView() {
      return view;
    },
  });

  // document.getElementById("add-tab-button").addEventListener("click", () => {
  //   const tabsListElement = document.getElementById("tabs-list");
  //   const tabElement = document.createElement("li");
  //   tabElement.textContent = "New Tab";
  //   tabsListElement.append(tabElement);
  // });

  return module;
}
