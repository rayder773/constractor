import { ViewList } from "../../../core/view/view_list.js";

export class TabsListViewList extends ViewList {
  static EVENTS = {
    SELECT_TAB: "selectTab",
  };

  constructor() {
    super();
  }

  html(): {} {
    return {
      tag: "ul",
      attributes: {
        id: "tabs-list",
      },
      events: {
        click: TabsListViewList.EVENTS.SELECT_TAB,
      },
      name: "tabsList",
    };
  }

  createListItem(data: any) {
    return this.createFromSchema({
      tag: "li",
      attributes: {
        class: "item",
      },
      ch: [
        {
          tag: "button",
          text: data,
        },
      ],
    });
  }

  changeActiveTab(index: number) {
    console.log("111", index);
  }
}
