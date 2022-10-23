import { ViewController } from "../ViewController.js";
import { ModelController } from "../ModelController.js";
import { NAME } from "../names.js";

function documentViewController() {
  return new ViewController({
    types: "document_view",
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

export const documentControllers = [
  documentViewController,
  documentModelController,
];
