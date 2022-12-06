import { Component } from "./core/Component.js";
import { DocumentViewController } from "./controllers/document.js";
import { MainWindowController } from "./controllers/window.js";
import { RouterComponent } from "./components/router.js";
import { renderController } from "./controllers/render.js";

const appComponent = new Component({
  proxy: {
    onHashchange: "choosePage",
    newPageAdded: "changeBody",
    askForRender: "render",
  },
  children: [
    DocumentViewController,
    MainWindowController,
    RouterComponent,
    renderController,
  ],
});

appComponent.start();
appComponent.tell("startApp");
