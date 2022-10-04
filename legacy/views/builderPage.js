export const builderView = {
  component: {
    div: {
      style: {
        display: "grid",
        gridAutoFlow: "row",
        gridTemplateColumns: "max-content 1fr max-content",
        height: "100%",
      },
      name: "builder",
      append: [
        {
          div: {
            name: "components",
            style: {
              border: "1px solid",
              width: "200px",
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
            style: {
              name: "settings",
              border: "1px solid",
              width: "200px",
            },
          },
        },
      ],
    },
  },
  hooks: {
    append() {
      // debugger;
      this.trigger("builderViewConnected", this.root());
    },
  },
};
