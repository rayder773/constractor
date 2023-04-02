import { Builder } from "./components/builder/controller.js";
import { BuilderControllerWrapper } from "./components/builder/wrapper.js";
import { PagesControllerWrapper } from "./components/pages_list/wrapper.js";
import { TabsControllerWrapper } from "./components/tabs/wrapper.js";
import { MainPage } from "./pages/main_page/controller.js";
import { MainPageViewModelWrapper } from "./pages/main_page/wrapper.js";

const app = new MainPageViewModelWrapper({
  controller: new MainPage(),
  children: {
    builder: new BuilderControllerWrapper({
      controller: new Builder(),
      children: {
        tabs: new TabsControllerWrapper({}),
        pages: new PagesControllerWrapper({}),
      },
    }),
  },
});

app.start();
app.render();
