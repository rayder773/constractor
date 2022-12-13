import { ViewController } from "../../../../../core/ViewController.js";

export function TabsViewController() {
  return new ViewController({
    child: {
      component: {
        div: {
          style: {
            display: "flex",
          },
          append: [
            {
              div: {
                name: "tabsList",
                style: {
                  display: "flex",
                },
              },
            },
            {
              button: {
                style: {
                  width: "40px",
                },
                text: "+",
                name: "addPage",
                event: {
                  click: "onPlusClick",
                },
              },
            },
          ],
        },
      },
    },
    listen: {
      createPleasePage() {
        this.ask("gatherBuilderPage", {
          name: "pageTabs",
          html: this.child.root,
        });
      },
      appenTabsList(data) {
        this.ask("askForRender", {
          element: this,
          params: {
            tabsList: {
              appendDomElement: data,
            },
          },
        });
      },
    },
  });
}
