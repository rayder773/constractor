import { ViewController } from "../ViewController.js";
import { ModelController } from "../ModelController.js";
import { NAME } from "../names.js";
import { Component } from "../Component.js";

function documentViewController() {
  return new ViewController({
    types: "document_view",
    child: {
      component: document,
    },
    globalEvents: {
      render: {
        newPage(data) {
          this.app.addEntity(data);
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

export function documentComponent() {
  return new Component({
    children: [documentViewController, documentModelController],
  });
}
