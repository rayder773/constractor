import { Component } from "./Component.js";
import { builderControllers } from "./components/builderPage.js";
import { documentControllers } from "./controllers/document.js";
import { pagesControllers } from "./controllers/pages.js";
import { pagesTabControllers } from "./controllers/pagesTab.js";
import { pageTabListItemControllers } from "./controllers/pageTabListItem.js";
import { NAME } from "./names.js";

// console.log(...builderControllers);
const appComponent = new Component({
  controllers: [...documentControllers],
  // components: [],
  // systemEvents: {
  //   [NAME.BUILDER_CHANNEL]: {
  //     [NAME.NEW_PAGE_WAS_ADDED]() {
  //       this.addControllers(...pageTabListItemControllers);
  //     },
  //   },
  // },
});

// console.log(appComponent);

window.appComponent = appComponent;
appComponent.start();
appComponent.ring({ global: ["askForBuilderPage"] });
