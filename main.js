import { App } from "./app.js";
import { Router } from "./router.js";
import { View } from "./view.js";
import { Component } from "./component.js";
import { div } from "./templateBuilder.js";
import { homePage } from "./pages/home.js";
import { loginPage } from "./pages/login.js";
import { Frame } from "./frame.js";
import { Module, ViewModule } from "./module.js";

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
        // listen: {
        //   mobileDevice(data) {
        //     console.log("mobileDevice", data);
        //   },
        // },
      }),
    app: () =>
      new ViewModule({
        data: {
          div: {
            text: "App",
            name: "textContainer",
            ch: [
              {
                span: {
                  text: "span chuild",
                  ch: [
                    {
                      form: {
                        ch: [
                          {
                            input: { name: "inpiut" },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        listen: {
          startApp(container) {
            this.create();
            this.set("textContainer", { appendTo: container });
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
