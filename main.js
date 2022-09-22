import { Component } from "./Component.js";
import { Frame } from "./Frame.js";

const component = new Component({
  viewModel: {
    div: {
      name: "main",
      append: [
        {
          div: {
            name: "child_1",
          },
        },
      ],
    },
  },
  events: {
    click(e) {
      this.change({
        main: {
          text: +new Date(),
        },
      });
    },
  },
});

const child = {
  viewModel: {
    div: {
      text: "child 1",
    },
  },
};

const main = {
  viewModel: {
    div: {
      text: "main secrion",
    },
  },
};

// child.create();

component.create();
component.setEvents();

component.add({
  main: main,
  child_1: child,
});
// // debugger;
// component.change({
//   main: {
//     append: [child.viewModel],
//   },
// });

const frame = new Frame({
  name: "",
  modules: {},
  view: null,
});

app.append(component.html);

// console.log(component.$("child_1_1"));
