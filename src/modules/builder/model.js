import { Model } from "../common/model.js";

export function BuilderModel({ tabsModel, pagesModel }) {
  const model = Model();

  model.addChild(tabsModel);
  model.addChild(pagesModel);

  const module = Object.freeze({
    ...tabsModel,
    ...model,
  });

  module.onNewTab(pagesModel.addPage.bind(pagesModel));

  return module;
}
