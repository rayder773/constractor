import { Component } from "../Component.js";
import { ModelController } from "../ModelController.js";
import { ViewController } from "../ViewController.js";

const name = "builderPage";

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
    systemEvents: {
      system: {
        ["builderPage:start"]() {
          console.log("start");
        },
      },
      global: {
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
        pages: {},
        activePageId: null,
      },
    },
  });
}

export function builderPageComponent() {
  return new Component({
    types: [name],
    controllers: [builderViewController, builderModelController],
    channels: [name],
  });
}
