import { builderPageComponent } from "../components/builderPage.js";
import { Controller } from "../Controller.js";

export function routerController() {
  return new Controller({
    globalEvents: {
      system: {
        "app:started"() {
          // debugger;
          this.addEntity(builderPageComponent);
        },
      },
    },
  });
}
