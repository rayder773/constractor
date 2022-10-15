import { Component } from "./Component.js";
import { ModelController } from "./ModelController.js";
import { ViewController } from "./ViewController.js";

import { builderComponent } from "./components/builder.js";

function documentViewController() {
  return new ViewController({
    child: {
      component: document,
    },
    systemEvents: {
      global: {
        renderBody(data) {
          this.change({
            body: {
              content: data,
            },
          });
        },
      },
    },
  });
}

function documentModelController() {
  return new ModelController({
    child: {
      data: {
        title: 0,
      },
    },
  });
}

const documentComponent = new Component({
  controllers: { documentViewController, documentModelController },
  components: { builderComponent },
  hooks: {
    append() {
      this.ring({
        global: ["askForPage"],
      });
    },
  },
});

window.documentComponent = documentComponent;
