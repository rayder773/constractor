import { ViewModule } from "../module.js";

export function homePage() {
  return new ViewModule({
    data: {
      div: {
        name: "home_page",
        style: {
          display: "grid",
          height: "100%",
          "grid-auto-flow": "column",
          "grid-template-columns": "max-content 1fr max-content",
        },
        ch: [
          {
            div: {
              name: "elements_panel",
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
              ch: [
                {
                  div: {
                    ch: [
                      {
                        div: {
                          name: "page_list",
                        },
                      },
                      {
                        div: {
                          name: "create_page",
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
                width: "200px",
                border: "1px solid",
              },
            },
          },
        ],
      },
    },
    modules: {
      createPageButton: () =>
        new ViewModule({
          data: {
            button: {
              text: "+",
            },
          },
        }),
    },
    listen: {
      homePage() {
        this.decoratorCreate();
        console.log(this);
        this.set({
          create_page: {
            text: 228,
          },
        });
        this.trigger("setPage", this.component);
      },
    },
  });
}
