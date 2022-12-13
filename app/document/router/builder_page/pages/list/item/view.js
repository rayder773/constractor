import { ViewController } from "../../../../../../../core/ViewController.js";

export function PagesListItemViewController() {
  return new ViewController({
    child: {
      component: {
        li: {},
      },
    },
    listen: {
      appendGridView(data) {
        this.askForRender({
          root: {
            content: data,
          },
        });
      },
    },
    hooks: {
      onStarted(data) {
        this.ask("pagesListItemViewControllerStarted", this.child.root);
      },
    },
  });
}
