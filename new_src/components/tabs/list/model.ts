import { Model } from "../../../core/model/index.js";

export class TabsListModel extends Model {
  static readonly EVENTS = {
    TABLIST_CHANGE: "change",
    CHANGE_ACTIVE_TAB: "change_active_tab",
  };

  constructor() {
    super();
    this.data = {
      tabs: [],
    };
  }

  addTab() {
    this.data.tabs.push(this.data.tabs.length);
    this.emit(TabsListModel.EVENTS.TABLIST_CHANGE, this.data.tabs.length);
  }

  selectTab(index: number) {
    this.data.tabs[index].selected = true;
    this.emit(TabsListModel.EVENTS.CHANGE_ACTIVE_TAB, index);
  }
}
