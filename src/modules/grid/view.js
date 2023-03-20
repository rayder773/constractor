import { View } from "../common/view.js";

export function GridView() {
  const view = View();

  return Object.freeze({
    ...view,
    addGridElement(data) {
      const { id, rows, cols, parentElement } = data;

      if (
        typeof id === "undefined" ||
        typeof rows === "undefined" ||
        typeof cols === "undefined" ||
        typeof parentElement === "undefined"
      ) {
        throw new Error("Grid id, rows, cols and parentElement are required");
      }

      const gridElement = document.createElement("div");
    },
  });
}
