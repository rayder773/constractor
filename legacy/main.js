import { App } from "./App.js";
import { Component } from "./Component.js";
import { View } from "./View.js";

const documentView = new View({
  component: document,
  interface: {
    appendPage(page) {
      this.change({
        body: page,
      });
    },
  },
});

const documentComponent = new Component({
  children: [documentView],
  channels: {
    global: ["appendPage"],
  },
  hooks: {
    append() {
      this.trigger({
        global: ["askForPage"],
      });
    },
  },
});

const builderView = new View({
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
});

const builderComponent = new Component({
  children: [builderView],
  // hooks: {
  //   append() {
  //     this.trigger({
  //       global: {
  //         appendPage: this.root(),
  //       },
  //     });
  //   },
  // },
});

const app = new App({
  children: [documentComponent, builderComponent],
  // channels: {
  //   global: { list: [] },
  //   builderPage: { list: [] },
  // },
});

app.start();
