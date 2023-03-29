import { View } from "../../core/view/index.js";

const ELEMENTS = {
  MAIN_PAGE: "mainPage",
  BUILDER: "builder",
};

const EVENTS = {
  MAIN_PAGE_CLICK: "mainPageClick",
};

export class MainPageView extends View {
  constructor() {
    super();
  }

  create({ builderElement }: { builderElement: HTMLElement }) {
    return {
      tag: "div",
      name: ELEMENTS.MAIN_PAGE,
      event: {
        click: EVENTS.MAIN_PAGE_CLICK,
      },
      ch: [
        {
          element: builderElement,
          name: ELEMENTS.BUILDER,
        },
      ],
    };
  }
}
