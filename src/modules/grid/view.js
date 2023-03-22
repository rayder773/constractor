import { View } from "../common/view.js";

export function GridView() {
  const view = View();

  return Object.freeze({
    ...view,
    renderRootGridElement(data) {
      const { id, parentElementId } = data;

      if (typeof id === "undefined" || typeof parentElementId === "undefined") {
        throw new Error("Grid id and parent element id are required");
      }

      const element = this.createGridElement({ id });

      document.getElementById(parentElementId).append(element);
    },
    createGridElement(data) {
      const { id } = data;

      if (typeof id === "undefined") {
        throw new Error("Grid id is required");
      }

      const gridElement = document.createElement("div");

      gridElement.id = `grid-${id}`;
      gridElement.classList.add("grid");

      return gridElement;
    },
    addGridElement(data) {},
  });
}
