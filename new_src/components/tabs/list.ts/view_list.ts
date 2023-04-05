import { ViewList } from "../../../core/view/view_list.js";

export class TabsListViewList extends ViewList {
  constructor() {
    super();
  }

  createListItem(data: any) {
    const li = document.createElement("li");
    li.textContent = data;

    return li;
  }
}
