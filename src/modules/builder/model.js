import { Model } from "../common/model.js";

export function BuilderModel({ tabsModel, gridModel }) {
  const model = Model();

  model.addChild(tabsModel);
  model.addChild(gridModel);

  const module = Object.freeze({
    ...tabsModel,
    ...model,
  });

  module.onNewTab(gridModel.addGrid.bind(gridModel));

  return module;
}
