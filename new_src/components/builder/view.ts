import { View } from "../../core/view/index.js";

export class BuilderView extends View {
  html() {
    return {
      tag: "div",
      attributes: {
        id: "builder",
      },
      ch: [
        {
          tag: "div",
          name: "tabs",
        },
        {
          tag: "div",
          name: "pages",
        },
      ],
    };
  }
}
