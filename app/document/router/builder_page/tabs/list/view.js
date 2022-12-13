import { ViewController } from "../../../../../../core/ViewController.js";

export function TabsListViewController() {
  return new ViewController({
    child: {
      component: {
        div: {
          style: {
            display: "flex",
          },
        },
      },
    },
    hooks: {
      onStarted() {
        this.ask("tabListViewCOntrollerStarted", this.child.root);
      },
    },
    listen: {
      appendNewTab(data) {
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
