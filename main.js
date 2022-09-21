import { Component } from "./Component.js";
import { Frame } from "./Frame.js";

const component = new Component({
  viewModel: {
    div: {
      text: "hello world",
      name: "main",
      // append: [
      //   {
      //     div: {
      //       name: "child_1",
      //       text: "child 1",
      //       append: [
      //         {
      //           span: {
      //             name: "child_1_1",
      //             text: "child_1_1",
      //           },
      //         },
      //       ],
      //     },
      //   },
      // ],
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

// debugger;
component.change({
  main: {
    append: [child.viewModel],
  },
});

app.append(component.html);

// console.log(component.$("child_1_1"));
