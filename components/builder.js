import { Component } from "../Component.js";
import { ModelController } from "../ModelController.js";
import { ViewController } from "../ViewController.js";

import { pagesComponent } from "./pages.js";

function builderViewController() {
  return new ViewController({
    child: {
      component: {
        div: {
          style: {
            display: "grid",
            height: "100%",
            gridTemplateColumns: "max-content 1fr max-content",
          },
          append: [
            {
              div: {
                name: "components",
                style: {
                  width: "200px",
                  border: "1px solid",
                },
              },
            },
            {
              div: {
                name: "pages",
                style: {
                  border: "1px solid",
                },
              },
            },
            {
              div: {
                name: "settings",
                style: {
                  width: "200px",
                  border: "1px solid",
                },
              },
            },
          ],
        },
      },
    },
    systemEvents: {
      global: {
        askForPage() {
          this.ring({
            global: [
              {
                renderBody: this.child.root,
              },
              "renderBuilder",
            ],
          });
        },
        renderPages(data) {
          this.change({
            pages: {
              content: data,
            },
          });
        },
      },
    },
  });
}

function builderModelController() {
  return new ModelController({
    child: {
      data: {
        pages: [],
        activePageIndex: -1,
      },
    },
    systemEvents: {
      builderPages: {
        newPage() {
          this.child.change({
            pages: {
              addToArray: {
                name: "new page",
                gridView: {
                  div: {
                    style: {
                      height: "100%",
                      border: "1px dashed",
                    },
                  },
                },
                gridModels: [
                  {
                    rows: 1,
                    cols: 1,
                  },
                ],
              },
            },
            activePageIndex: {
              set: this.child.data.pages.length,
            },
          });
        },
        setNewActivePage(data) {
          this.change({
            activePageIndex: {
              set: data,
            },
          });
        },
      },
    },
    childChanges: {
      pages: {
        addToArray(data) {
          this.ring({
            builderPages: [{ newPageWasAdded: data }],
          });
        },
      },
      activePageIndex: {
        set(data) {
          this.ring({
            builderPages: [{ changeActivePage: data }],
          });
        },
      },
    },
  });
}

export function builderComponent(params) {
  return new Component({
    controllers: { builderViewController, builderModelController },
    components: { pagesComponent },
    ...params,
  });
}
