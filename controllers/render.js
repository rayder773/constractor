import { Controller } from "../Controller.js";

export function renderController() {
  return new Controller({
    globalEvents: {
      render: {
        append(data) {
          console.log(data);
        },
      },
    },
  });
}
