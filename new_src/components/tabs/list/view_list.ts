import { ViewList } from "../../../core/view/view_list.js";

export class TabsListViewList extends ViewList {
  constructor() {
    super();
  }

  html(): {} {
    return {
      tag: "ul",
      attributes: {
        id: "tabs-list",
      },
    };
  }

  createListItem(data: any) {
    return this.createFromSchema({
      tag: "li",
      ch: [
        {
          tag: "button",
          text: data,
          attributes: {
            class: "item",
          },
        },
      ],
    });
  }
}
