import { Model } from "../../../core/model/index.js";

export class TabsListModel extends Model {
  constructor() {
    super();
    this.data = {
      tabs: [],
    };
  }

  addTab() {
    this.data.tabs.push(this.data.tabs.length);
    this.emit("change", this.data.tabs.length);
  }
}
