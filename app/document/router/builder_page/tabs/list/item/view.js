import { ViewController } from "../../../../../../../core/ViewController.js";

export function TabsListItemViewController() {
  return new ViewController({
    name: "item",
    child: {
      component: {
        div: {
          event: {
            click: "onTabClick",
          },
        },
      },
    },
    hooks: {
      onStarted(data) {
        this.askForRender({
          root: {
            text: data.name,
          },
        });

        this.ask("newTabCreated", this.child.root);
      },
    },
  });
}
