import { Builder } from "../../builder/index.js";
import { Page } from "../index.js";
import { MainPageView } from "./view.js";

export function MainPage() {
  const builder = Builder();
  const page = Page();

  const mainPageView = MainPageView({
    builderView: builder.getBuilderView(),
    pageView: page.getPageView(),
  });

  mainPageView.addListener("RENDER", () => {
    console.log("render main page");
  });

  return Object.freeze({
    ...mainPageView,
    getMainPageView() {
      return MainPageView;
    },
  });
}
