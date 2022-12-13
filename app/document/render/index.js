import { Controller } from "../../../core/Controller.js";

export function RenderController() {
  return new Controller({
    listen: {
      render({ element, params }) {
        element.change(params);
      },
    },
  });
}
