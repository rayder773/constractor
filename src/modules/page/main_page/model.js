import { Model } from "../../common/model.js";

export function MainPageModel({ builderModel }) {
  const model = Object.freeze({
    ...builderModel,
    ...Model(),
  });

  model.addChild(builderModel);

  window.model = model;

  return model;
}
