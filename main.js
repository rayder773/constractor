import { App } from "./App.js";
import { documentComponent } from "./components/document.js";
import { routerController } from "./controllers/router.js";

const app = new App({
  children: [documentComponent, routerController],
});

app.start();

console.log(app);
