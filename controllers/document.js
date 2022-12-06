import { ViewController } from "../core/ViewController.js";

export function DocumentViewController() {
  return new ViewController({
    child: {
      component: document,
    },
    listen: {
      changeBody(body) {
        this.ask("askForRender", { parent: this.child.$("body"), child: body });
      },
    },
  });
}
