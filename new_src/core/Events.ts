import { PagesModel } from "../components/pages/model.js";
import { TabsListModel } from "../components/tabs/list/model.js";
import { TabsListViewList } from "../components/tabs/list/view_list.js";

export class Events {
  static MODEL = {
    ...TabsListModel.EVENTS,
    ...PagesModel.EVENTS,
  };

  static VIEW = {
    ...TabsListViewList.EVENTS,
  };
}
