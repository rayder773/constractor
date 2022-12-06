import { Controller } from "../Controller.js";

export function renderController() {
  return new Controller({
    listen: {
      render({ parent, child }) {
        parent.append(child);
      },
    },
  });
}
