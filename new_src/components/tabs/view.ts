import { View } from "../../core/view/index.js";

export class TabsView extends View {
  constructor() {
    super();
  }

  html() {
    return {
      tag: "div",
      attributes: {
        id: "tabs",
      },
    };
  }
}
