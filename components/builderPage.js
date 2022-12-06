import { Component } from "../core/Component.js";
import { ModelController } from "../core/ModelController.js";
import { ViewController } from "../core/ViewController.js";

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
          parent: this.child.$(data.name),
          child: data.html,
        });
      },
      sendPageForRender() {
        this.ask("newPageAdded", this.child.root);
      },
      changeViewsWithNewPage(data) {
        this.ask("askForRender", {
          parent: this.child.$("pages"),
          child: data.name,
        });
      },
    },
  });
}

function builderModelController() {
  return new ModelController({
    child: {
      data: {
        pages: [],
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
    },
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
      changeViewsWithNewPage(data) {
        this.ask("askForRender", {
          parent: this.child.$("pageList"),
          child: data.name,
        });
      },
    },
  });
}

export function builderPageComponent() {
  return new Component({
    children: [
      builderViewController,
      builderModelController,
      pageTabsViewController,
    ],
    proxy: {
      gatherBuilderPage: "appendBuilderPageComponent",
      onPlusClick: "addPlus",
      newPageInModel: "changeViewsWithNewPage",
    },
    hooks: {
      onStarted() {
        this.tell("createPleasePage");
        this.tell("sendPageForRender");
      },
    },
  });
}
