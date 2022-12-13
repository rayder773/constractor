import { Component } from "../../../../../core/Component.js";
import { PagesListComponent } from "./list/index.js";
import { BuilderPagesListViewController } from "./view.js";

export function BuilderPagesListComponent() {
  return new Component({
    children: [BuilderPagesListViewController, PagesListComponent],
    proxy: {
      pagesListItemViewControllerStarted: "appendPages",
    },
  });
}
