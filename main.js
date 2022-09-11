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
          page: window.location.hash.replace("#", "") || "/",
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
          askForPage(data) {
            return data;
          },
        },
        listen: {
          askForPage() {
            const page = this._model._data.page;
            this.trigger("whoIsPage", page);
          },
        },
      }),
    app: () =>
      new ViewModule({
        listen: {
          startApp(container) {
            const app = HTMLtoObject(container);
            this.change(app);
            this.trigger("askForPage");
          },
          setPage(page) {
            this.set({
              app: {
                content: page,
              },
            });
          },
        },
      }),
    router: () =>
      new Module({
        data: {
          "/": "homePage",
          "/login": "loginPage",
        },
        listen: {
          whoIsPage(pageName) {
            if (this._model._data[pageName]) {
              this.trigger(this._model._data[pageName]);
            }
          },
        },
      }),
    homePage: () =>
      new ViewModule({
        data: {
          div: {
            name: "home_page",
            ch: [
              {
                div: {
                  text: "home page",
                },
              },
              {
                a: {
                  href: "#/login",
                  text: "back to login page",
                },
              },
            ],
          },
        },
        listen: {
          homePage() {
            this.decoratorCreate();
            this.trigger("setPage", this.component);
          },
        },
      }),
    loginPage: () =>
      new ViewModule({
        data: {
          div: {
            name: "login_page",
            ch: [
              {
                div: {
                  text: "login page hello",
                },
              },
              {
                a: {
                  href: "#/",
                  text: "back to home",
                },
              },
            ],
          },
        },
        listen: {
          loginPage() {
            this.decoratorCreate();
            this.trigger("setPage", this.component);
          },
        },
      }),
  },
});

frame.trigger("startApp", document.getElementById("app"));

window.frame = frame;
