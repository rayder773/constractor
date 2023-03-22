import { Model } from "../common/model.js";

const EVENT = {
  NEW: "NEW",
};

export function PagesModel({ gridModel }) {
  let pages = [];

  const model = Model();

  model.addChild(gridModel);

  model.addListener(EVENT.NEW, gridModel.addGrid.bind(gridModel));

  const module = Object.freeze({
    ...model,
    addPage(data) {
      pages.push(data);
      this.notify(EVENT.NEW, data);
    },
    onNewPage(callback) {
      this.addListener(EVENT.NEW, callback);
    },
  });

  return module;
}
