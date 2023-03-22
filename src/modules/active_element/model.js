import { Model } from "../common/model.js";

export function ActiveElementModel() {
  const model = Model();

  const module = Object.freeze({
    ...model,
  });

  return module;
}
