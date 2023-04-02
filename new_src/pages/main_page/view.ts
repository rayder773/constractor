import { View } from "../../core/view/index.js";

export class MainPageView extends View {
  html() {
    return {
      tag: "div",
      attributes: {
        id: "main-page",
      },
      ch: [
        {
          tag: "div",
        },
        {
          tag: "div",
          name: "builder",
        },
        {
          tag: "div",
        },
      ],
    };
  }
}
