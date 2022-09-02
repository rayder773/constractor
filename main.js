import { App } from "./app.js";
import { Router } from "./router.js";
import { View } from "./view.js";
import { Component } from "./component.js";
import { div } from "./templateBuilder.js";
import { homePage } from "./pages/home.js";
import { loginPage } from "./pages/login.js";

document.documentElement.events = [];

const test = div({
  text: 228,
  name: "parent",
  children: [
    div({
      text: "child_1",
      name: "child_1",
      children: [div({ name: "child_1-1", text: "child_1-1" })],
    }),
  ],
});

function checkAB() {
  return 2 === 3;
}
const routes = {
  "/": {
    // permissions: {
    //   check: [checkAB],
    //   fallback: "/login",
    // },
    // redirect: "home",
    // withParams: {
    //   ":id": "",
    //   ":id/:name": "",
    // },
    // beforeMount() {},
    page: homePage,
    // afterMount() {},
  },
  "/login": {
    page: loginPage,
  },
  "/logout": {
    redirect: "/login",
    // page: homePage,
  },
};

const app = new App({ router: routes });
// const router = new Router({ routes });

// console.log(router);

// const view = new View(test, {
//   parent: {
//     color: "red",
//   },
//   child_1: {
//     color: "green",
//   },
// });

// const viewComponent = new Component({
//   view,
//   models: {
//     user: {},
//   },
//   client: {
//     listenModels: {
//       default() {},
//       changeColor(color) {
//         this.view.$("text").style.color = color;
//         this.clienTriggers.parent.click = "testClick";
//       },
//     },
//   },
//   appState: {
//     listenClient: {
//       onParentClick(models) {
//         models.user.changeName("denys");
//       },
//     },
//   },
//   newtwork: {
//     listenClient: {
//       onParentClick() {
//         // models.user.changeName("denys");
//       },
//     },
//   },
// });

// view.appendTo(document.body);
