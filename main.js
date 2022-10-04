import { Component } from "./Component.js";
import { Controller } from "./Controller.js";
import { Model } from "./Model.js";
import { ModelController } from "./ModelController.js";
import { View } from "./View.js";
import { ViewController } from "./ViewController.js";

function documentViewController() {
  return new ViewController({
    child: {
      component: document,
    },
    userEvents: {
      root: {
        click() {
          this.ring({
            global: ["changeTitle"],
          });
        },
      },
    },
    systemEvents: {
      global: {
        renderNewTitle(data) {
          this.change({
            root: {
              title: data,
            },
          });
        },
        renderBody(data) {
          this.change({
            body: {
              text: data,
            },
          });
        },
      },
    },
  });
}

function documentModelController() {
  // const { modules } = component;
  // debugger;
  // component.subscribe({
  //   global: {
  //     changeTitle() {
  //       modules.documentModel.change({
  //         title: this.modules.documentModel.data.title + 1,
  //       });
  //     },
  //   },
  // });

  // modules.documentModel.listen("change:title", (data) => {
  //   let eventName = "renderNewTitle";

  //   if (data.title % 3 == 0) {
  //     eventName = "renderBody";
  //   }

  //   component.ring({ global: [{ [eventName]: data.title }] });
  // });
  return new ModelController({
    child: {
      data: {
        title: 0,
      },
    },
    systemEvents: {
      global: {
        changeTitle() {
          this.change({
            title: this.data.title + 1,
          });
        },
      },
    },
    modelChanges: {
      change: {
        title(data) {
          console.log("this", this);
          console.log("data", data);
        },
      },
    },
  });
}

const documentComponent = new Component({
  controllers: { documentViewController, documentModelController },
});

console.log(documentComponent);
