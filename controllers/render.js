import { Controller } from "../core/Controller.js";

export function renderController() {
  return new Controller({
    listen: {
      render({ parent, child }) {
        parent.append(child);
      },
    },
  });
}
