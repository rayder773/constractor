import { Component } from "../../../../../../core/Component.js";
import { PagesListItemComponent } from "./item/index.js";

export function PagesListComponent() {
  return new Component({
    children: [],
    listen: {
      changeViewsWithNewPage(data) {
        this.addChild({
          child: PagesListItemComponent,
          data: data.newItem,
          id: data.newItem.id,
        });
      },
    },
  });
}
