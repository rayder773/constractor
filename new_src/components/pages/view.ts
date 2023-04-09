import { ViewList } from "../../core/view/view_list.js";

export class PagesView extends ViewList {
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

  createListItem(data: any) {
    return this.createFromSchema({
      tag: "div",
      attributes: {
        class: "page",
      },
    });
  }
}
