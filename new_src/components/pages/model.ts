import { Model } from "../../core/model/index.js";

export class PagesModel extends Model {
  static readonly EVENTS = {
    ADD_PAGE_TO_MODEL: "add_page",
  };

  constructor() {
    super();

    this.data = {
      pages: [],
    };
  }

  getDefaultPage(data: { id: string; name: string }) {
    return {
      id: data.id,
      name: data.name,
      grids: {},
    };
  }

  addPage(data: { id: string; name: string }) {
    this.data.pages.push(this.getDefaultPage(data));
    this.emit(PagesModel.EVENTS.ADD_PAGE_TO_MODEL, data);
  }
}
