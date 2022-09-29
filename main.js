import { Frame } from "./Frame.js";
import { View } from "./View.js";

const appContainer = {
  component: document.getElementById("app"),
  subscribeTo: {
    appendBuilder(builder) {
      this.change({
        component: {
          content: builder,
        },
      });
    },
  },
};

const builder = {
  component: {
    div: {
      style: {
        display: "grid",
        gridAutoFlow: "row",
        gridTemplateColumns: "max-content 1fr max-content",
      },
      name: "builder",
      append: [
        {
          div: {
            name: "components",
            style: {
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
            style: {
              name: "settings",
              border: "1px solid",
            },
          },
        },
      ],
    },
  },
  hooks: {
    append() {
      this.trigger("builderConnected", this.component);
    },
  },
};

const app = new Frame({
  modules: {
    container: new View(appContainer),
    builder: new View(builder),
  },
  connector: {
    builderConnected: "appendBuilder",
  },
});

app.start();
