import { ViewController } from "../../../../../core/ViewController.js";

export function BuilderPagesListViewController() {
  return new ViewController({
    child: {
      component: {
        ul: {
          style: {
            display: "flex",
          },
        },
      },
    },
    listen: {
      createPleasePage() {
        this.ask("gatherBuilderPage", {
          name: "pages",
          html: this.child.root,
        });
      },
      appendPages(data) {
        this.ask("askForRender", {
          element: this,
          params: {
            root: {
              appendDomElement: data,
            },
          },
        });
      },
    },
  });
}
