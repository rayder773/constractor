import { Frame } from "./Frame.js";
import { View } from "./View.js";

const container = {
  hooks: {
    append() {
      console.log("render");
    },
  },
  subscribeTo: {
    event1() {},
  },
};

const app = new Frame({
  modules: {
    container: new View(container),
  },
  // connector: {
  //   event1: "event_1",
  //   event2: ["event_2", "event_2_1"],
  // },
});

console.log(app);

app.start();
