import { App } from "./App.js";
import { documentComponent } from "./components/document.js";
import { renderController } from "./controllers/render.js";
import { routerController } from "./controllers/router.js";

const app = new App({
  children: [documentComponent, routerController, renderController],
});

app.start();

console.log(app);
