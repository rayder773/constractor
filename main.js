import { Component } from "./Component.js";
import { Frame } from "./Frame.js";

const component = new Component({
  viewModel: {},
});

const frame = new Frame({
  name: "app",
  modules: {},
  view: document.getElementById("app"),
});

frame.initView();

console.log(frame);

// const frame1 = new Frame({
//   name: "app",
//   modules: {},
//   view: component,
// });

// frame1.initView();

// app.append(component.html);

// console.log(component.$("child_1_1"));
