import { Component } from "../../../../../../../../core/Component.js";
import { GridModelController } from "./model.js";
import { GridViewController } from "./view.js";

export function GridComponent() {
  return new Component({
    children: [GridViewController, GridModelController],
  });
}
