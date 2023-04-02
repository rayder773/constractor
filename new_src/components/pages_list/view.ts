import { View } from "../../core/view/index.js";

export class PagesView extends View {
  constructor() {
    super();
  }

  html(): {} {
    return {
      tag: "div",
      attributes: {
        id: "pages",
      },
    };
  }
}
