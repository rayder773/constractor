import { Component } from "../../../../../../core/Component.js";
import { TabsListItemViewController } from "./item/view.js";
import { TabsListViewController } from "./view.js";

export function TabsListComponent() {
  return new Component({
    children: [TabsListViewController],
    proxy: {
      newTabCreated: "appendNewTab",
    },
    listen: {
      changeViewsWithNewPage(data) {
        this.addChild({
          child: TabsListItemViewController,
          data: data.newItem,
          id: data.newItem.id,
        });
      },
    },
  });
}
