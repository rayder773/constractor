import { Component } from "../../../../core/Component.js";
import { BuilderModelController } from "./model.js";
import { BuilderPagesListComponent } from "./pages/index.js";
import { BuilderPageTabsComponent } from "./tabs/index.js";
import { BuilderViewController } from "./view.js";

export function BuilderPageComponent() {
  return new Component({
    children: [
      BuilderViewController,
      BuilderModelController,
      BuilderPageTabsComponent,
      BuilderPagesListComponent,
    ],
    proxy: {
      gatherBuilderPage: "appendBuilderPageComponent",
      onPlusClick: "addPlus",
      newPageInModel: "changeViewsWithNewPage",
      onTabClick: "makePageActive",
    },
    hooks: {
      onStarted() {
        this.tell("createPleasePage");
        this.tell("sendPageForRender");
      },
    },
  });
}
