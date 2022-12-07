import { Component } from "../../core/Component.js";
import { ViewController } from "../../core/ViewController.js";

export function BuilderPageTabsListComponent() {
  return new Component({
    children: [TabsViewController, TabsListComponent, TabsListViewController],
    proxy: {
      newTabCreated: "appendNewTab",
      tabListViewCOntrollerStarted: "appenTabsList",
    },
  });
}

function TabsListComponent() {
  return new Component({
    listen: {
      changeViewsWithNewPage(data) {
        this.addChild({
          child: TabsListItemViewController,
          data: data.newItem,
          id: data.array.length - 1,
        });
      },
    },
  });
}

function TabsListViewController() {
  return new ViewController({
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

function TabsViewController() {
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

function TabsListItemViewController() {
  return new ViewController({
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
