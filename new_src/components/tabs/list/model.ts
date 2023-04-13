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
      selectedIndex: null,
    };
  }

  getDefaultTab() {
    return {
      name: "New Tab",
      id: this.data.tabs.length,
    };
  }

  addTab() {
    this.data.tabs.push(this.getDefaultTab());
    this.emit(TabsListModel.EVENTS.TABLIST_CHANGE, this.data.tabs.length);

    if (this.data.selectedIndex === null) {
      this.selectTab(0);
    }
  }

  selectTab(index: number) {
    this.emit(TabsListModel.EVENTS.CHANGE_ACTIVE_TAB, {
      oldSelected: this.data.selectedIndex,
      newSelected: index,
    });

    this.data.selectedIndex = index;
  }
}
