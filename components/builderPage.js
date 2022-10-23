import { ModelController } from "../ModelController.js";
import { NAME } from "../names.js";
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
    systemEvents: {
      global: {
        askForBuilderPage() {
          this.ring({
            global: [
              {
                renderBody: this.child.root,
              },
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
        pages: {},
        activePageId: null,
      },
    },
  });
}

export const builderControllers = [
  builderViewController,
  builderModelController,
];
