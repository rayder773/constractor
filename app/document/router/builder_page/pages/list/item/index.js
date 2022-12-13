import { Component } from "../../../../../../../core/Component.js";
import { GridComponent } from "./grid/index.js";
import { PagesListItemViewController } from "./view.js";

export function PagesListItemComponent() {
  return new Component({
    children: [PagesListItemViewController, GridComponent],
    proxy: {
      gridViewReady: "appendGridView",
    },
  });
}
