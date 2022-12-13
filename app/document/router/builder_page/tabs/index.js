import { Component } from "../../../../../core/Component.js";
import { TabsListComponent } from "./list/index.js";
import { TabsViewController } from "./view.js";

export function BuilderPageTabsComponent() {
  return new Component({
    children: [TabsViewController, TabsListComponent],
    proxy: {
      tabListViewCOntrollerStarted: "appenTabsList",
    },
  });
}
