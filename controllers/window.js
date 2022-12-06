import { WindowController } from "../WindowController.js";

export function MainWindowController() {
  return new WindowController({
    clienEvents: ["click", "resize", "hashchange"],
    listen: {
      setHash(hash) {
        location.hash = hash;
      },
    },
  });
}
