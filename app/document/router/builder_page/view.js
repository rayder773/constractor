import { ViewController } from "../../../../core/ViewController.js";

export function BuilderViewController() {
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
