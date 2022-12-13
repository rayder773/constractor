import { Component } from "./core/Component.js";
import { DocumentComponent } from "./app/document/index.js";
import { MainWindowController } from "./app/window/index.js";

const appComponent = new Component({
  proxy: {
    onHashchange: "choosePage",
  },
  children: [DocumentComponent, MainWindowController],
});

appComponent.initEntity();
appComponent.startEntity();
appComponent.tell("startApp");

// console.log(appComponent);
