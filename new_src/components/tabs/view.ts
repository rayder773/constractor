import { View } from "../../core/view/index.js";

export class TabsView extends View {
  elementNames = {
    tabsList: "tabsList",
    addTabButton: "addTabButton",
  };

  elementEventNames = {
    addTab: "addTab",
  };

  constructor() {
    super();
  }

  html() {
    return {
      tag: "div",
      ch: [
        {
          tag: "div",
          name: this.elementNames.tabsList,
        },
        {
          tag: "button",
          text: "+",
          name: this.elementNames.addTabButton,
          events: {
            click: this.elementEventNames.addTab,
          },
        },
      ],
    };
  }

  getTabListElement() {
    return this.getActiveElement(this.elementNames.tabsList);
  }

  renderTab(data: string) {
    const tab = document.createElement("li");
    tab.textContent = data;

    const listElement = this.getTabListElement();

    listElement.append(tab);
  }
}
