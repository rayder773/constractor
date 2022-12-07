import { Component } from "../core/Component.js";
import { ModelController } from "../core/ModelController.js";
import { ViewController } from "../core/ViewController.js";
import { BuilderPagePagesListComponent } from "./builder_page/pages.js";
import { BuilderPageTabsListComponent } from "./builder_page/tabs_list.js";

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
                style: {
                  border: "1px solid",
                },
                append: [
                  {
                    div: {
                      style: {
                        height: "100%",
                      },
                      append: [
                        {
                          div: {
                            name: "pageTabs",
                          },
                        },
                        {
                          div: {
                            name: "pages",
                            style: {
                              display: "grid",
                              gridTemplateRows: "max-content 1fr",
                            },
                          },
                        },
                      ],
                    },
                  },
                ],
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
    listen: {
      appendBuilderPageComponent(data) {
        this.ask("askForRender", {
          element: this,
          params: {
            [data.name]: {
              appendDomElement: data.html,
            },
          },
        });
      },
      sendPageForRender() {
        this.ask("newPageAdded", this.child.root);
      },
    },
  });
}

function builderModelController() {
  return new ModelController({
    child: {
      data: {
        pages: [],
        activePage: null,
      },
    },
    onChange: {
      pages: {
        addToArray: "newPageInModel",
      },
    },
    listen: {
      addPlus() {
        this.change({
          pages: {
            addToArray: { name: "new page" },
          },
        });
      },
      makePageActive(data) {
        console.log(data);
      },
    },
  });
}

export function builderPageComponent() {
  return new Component({
    children: [
      builderViewController,
      builderModelController,
      BuilderPagePagesListComponent,
      BuilderPageTabsListComponent,
    ],
    proxy: {
      gatherBuilderPage: "appendBuilderPageComponent",
      onPlusClick: "addPlus",
      newPageInModel: "changeViewsWithNewPage",
      onTabClick: "makePageActive",
    },
    hooks: {
      onStarted() {
        this.tell("createPleasePage");
        this.tell("sendPageForRender");
      },
    },
  });
}
