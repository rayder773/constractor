import { Component } from "../core/Component.js";
import { builderPageComponent } from "./builderPage.js";
import { Controller } from "../core/Controller.js";
import { ModelController } from "../core/ModelController.js";

export function RouterController() {
  return new Controller({
    listen: {
      choosePage(data) {
        const hash = data.replace("#", "") || "/";

        switch (hash) {
          case "/":
            return this.ask("addPage", builderPageComponent);
        }
      },

      startApp() {
        this.listen.choosePage.call(this, location.hash);
      },
    },
  });
}

function RouterModel() {
  return new ModelController();
}

export function RouterComponent() {
  return new Component({
    children: [RouterController, RouterModel],
    listen: {
      addPage(page) {
        this.addChild({ child: page });
      },
    },
  });
}
