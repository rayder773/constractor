import { ViewModel } from "../../../core/controller/index.js";
import { TabsListModel } from "./model.js";
import { TabsListViewList } from "./view_list.js";

export class TabsListController extends ViewModel {
  model: TabsListModel;
  view: TabsListViewList;

  constructor() {
    const model = new TabsListModel();
    const view = new TabsListViewList();

    super({ view, model });

    this.model = model;
    this.view = view;
  }
}
