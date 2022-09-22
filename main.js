import { Component } from "./Component.js";
import { Frame } from "./Frame.js";

const component = new Component({
  viewModel: {
    div: {
      name: "main",
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

const child = new Component({
  viewModel: {
    div: {
      name: "child_1",
      text: "child 1",
    },
  },
});

// child.create();

component.create();
component.setEvents();

// component.add({});
// // debugger;
// component.change({
//   main: {
//     append: [child.viewModel],
//   },
// });

app.append(component.html);

// console.log(component.$("child_1_1"));
