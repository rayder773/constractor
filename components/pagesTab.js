import { Component } from "../Component.js";
import { ViewController } from "../ViewController.js";

export function pageTabsComponent(params) {
  return new Component({
    controllers: { pageTabsViewController },
    ...params,
  });
}

function pageTabsViewController() {
  return new ViewController({
    child: {
      component: {
        div: {
          style: {
            display: "flex",
          },
          append: [
            {
              ul: {
                name: "pageList",
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
              },
            },
          ],
        },
      },
    },
    userEvents: {
      addPage: {
        click() {
          this.ring({
            builderPages: ["newPage"],
          });
        },
      },
      pageList: {
        click(e) {
          const index = Array.from(e.currentTarget.children).indexOf(e.target);
          this.ring({
            builderPages: [{ setNewActivePage: index }],
          });
        },
      },
    },
    systemEvents: {
      builderPages: {
        builderPagesWasRendered() {
          this.ring({
            builderPages: [
              {
                renderPagesTab: this.child.root,
              },
            ],
          });
        },
        newPageWasAdded(data) {
          this.change({
            pageList: {
              append: {
                li: {
                  style: {
                    border: "1px solid",
                  },
                  append: [
                    {
                      button: {
                        style: {
                          pointerEvents: "none",
                        },
                        text: data.newElement.name,
                      },
                    },
                  ],
                },
              },
            },
          });
        },
        changeActivePage(data) {
          this.change({
            pageList: {
              childByIndex: {
                [data.oldValue]: {
                  style: {
                    borderColor: "black",
                  },
                },
                [data.newValue]: {
                  style: {
                    borderColor: "red",
                  },
                },
              },
            },
          });
        },
      },
    },
  });
}
