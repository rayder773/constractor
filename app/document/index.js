import { Component } from "../../core/Component.js";
import { DocumentViewController } from "./view.js";
import { RenderController } from "./render/index.js";
import { RouterComponent } from "./router/index.js";

export function DocumentComponent() {
  return new Component({
    proxy: {
      newPageAdded: "changeBody",
      askForRender: "render",
    },
    children: [DocumentViewController, RenderController, RouterComponent],
  });
}
