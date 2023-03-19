import { EventEmmiter } from "../../common/event_emmiter.js";
import { View } from "../../common/view.js";

export function MainPageView({ pageView, builderView } = {}) {
  return Object.freeze({
    ...View(),
    createMainPageElement() {
      const containerElement = document.createElement("div");
      containerElement.id = "main-page";

      const componentBlockElement = document.createElement("div");
      containerElement.append(componentBlockElement);

      const builderElement = builderView.createBuilderElement();
      containerElement.append(builderElement);

      const stylesBlockElement = document.createElement("div");
      containerElement.append(stylesBlockElement);

      this.addChild(builderView);
      this.addChild(pageView);

      return containerElement;
    },
    renderMainPageElement() {
      const mainPageElement = this.createMainPageElement();

      pageView.createPageElement(mainPageElement);

      this.render({ child: mainPageElement });
    },
  });
}
