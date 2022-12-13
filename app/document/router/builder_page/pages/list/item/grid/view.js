import { ViewController } from "../../../../../../../../core/ViewController.js";

export function GridViewController() {
  return new ViewController({
    child: {
      component: {
        div: {
          text: "grid",
        },
      },
    },
    hooks: {
      onStarted(data) {
        this.ask("gridViewReady", this.child.root);
      },
    },
  });
}
