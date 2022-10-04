import { Frame } from "../Frame.js";
import { View } from "../View.js";
import { builderView } from "../views/builderPage.js";

export const builderPageFrame = {
  modules: {
    builder: new View(builderView),
    pageSection: new Frame({
      view: new View(),
    }),
  },
  exportEvents: ["builderViewConnected"],
};
