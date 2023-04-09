import { Events } from "../../../core/Events.js";
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

  initEvents() {
    return {
      [Events.VIEW.SELECT_TAB]: this.onSelectedTab.bind(this),
      [TabsListModel.EVENTS.CHANGE_ACTIVE_TAB]: this.view.changeActiveTab.bind(
        this.view
      ),
    };
  }

  onSelectedTab(e: Event, index: number) {
    this.model.selectTab(index);
  }
}
