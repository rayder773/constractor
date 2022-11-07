import { Component } from "../Component.js";
import { ModelController } from "../ModelController.js";
import { ViewController } from "../ViewController.js";

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
                            append: [
                              {
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
                            ],
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
    bubbleEvents: {
      parentStarted() {
        this.globalRing({ render: { append: this.child.root } });
      },
    },
    globalEvents: {
      render: {
        appendTabs(content) {
          this.change({
            pageList: {
              content,
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
        pages: {},
        activePageId: null,
      },
    },
  });
}

function pageTabsViewController() {
  return new ViewController({
    child: {
      component: {
        div: {
          text: "pageTabsView",
        },
      },
    },
    bubbleEvents: {
      parentStarted() {
        this.globalRing({ render: { append: this.child.root } });
      },
    },
  });
}

export function builderPageComponent() {
  return new Component({
    types: ["page", "builderPage"],
    children: [
      builderViewController,
      builderModelController,
      pageTabsViewController,
    ],
  });
}
