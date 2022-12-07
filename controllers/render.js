import { Controller } from "../core/Controller.js";

export function renderController() {
  return new Controller({
    listen: {
      render({ element, params }) {
        element.change(params);
      },
    },
  });
}
