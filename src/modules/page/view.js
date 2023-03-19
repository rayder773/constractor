import { View } from "../common/view.js";

export function PageView() {
  return Object.freeze({
    ...View(),
    createPageElement(element) {
      if (typeof element === "undefined") {
        throw new Error("invalid params");
      }

      element.classList.add("page-element");
    },
  });
}
