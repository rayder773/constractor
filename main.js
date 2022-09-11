import { App } from "./app.js";
import { Router } from "./router.js";
import { View } from "./view.js";
import { Component } from "./component.js";
import { div } from "./templateBuilder.js";
import { homePage } from "./pages/home.js";
import { loginPage } from "./pages/login.js";
import { Frame } from "./frame.js";
import { Module, ViewModule } from "./module.js";
import { HTMLtoObject } from "./utils.js";

const frame = new Frame({
  modules: {
    window: () =>
      new ViewModule({
        data: {
          width: "",
          height: "",
        },
        view: {
          events: {
            resize(e) {
              return {
                width: window.innerWidth,
                height: window.innerHeight,
              };
            },
          },
        },
        events: {
          mobileDevice({ width }) {
            return width <= 760;
          },
        },
        // listen: {
        //   newPage(data) {
        //     console.log("newPage", data);
        //   },
        // },
      }),
    location: () =>
      new ViewModule({
        data: {
          page: "/",
        },
        view: {
          events: {
            hashchange() {
              return {
                page: window.location.hash.replace("#", ""),
              };
            },
          },
        },
        events: {
          newPage(data) {
            return data;
          },
        },
        listen: {
          askForPage() {
            return this.data.page;
          },
        },
      }),
    app: () =>
      new ViewModule({
        listen: {
          startApp(container) {
            const app = HTMLtoObject(container);

            this.change(app);
          },
          newPage(page) {
            this.set({
              content: page,
            });
          },
        },
      }),
  },
});

frame.trigger("startApp", document.getElementById("app"));

window.frame = frame;
