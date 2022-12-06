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
    },
  });
}

function builderModelController() {
  return new ModelController({
    child: {
      data: {},
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
    },
    hooks: {
      onStarted() {
        this.tell("createPleasePage");
        this.tell("sendPageForRender");
      },
    },
  });
}
