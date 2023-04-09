import { TabsListModel } from "../components/tabs/list/model.js";
import { TabsListViewList } from "../components/tabs/list/view_list.js";

export class Events {
  static MODEL = {
    ...TabsListModel.EVENTS,
  };

  static VIEW = {
    ...TabsListViewList.EVENTS,
  };
}
