import { ActiveElementModel } from "./model.js";

export function ActiveElement() {
  const model = ActiveElementModel();

  const module = Object.freeze({
    getActiveElementModel() {
      return model;
    },
  });

  return module;
}
