import { Builder } from "../../builder/index.js";
import { Page } from "../index.js";
import { MainPageModel } from "./model.js";
import { MainPageView } from "./view.js";

export function MainPage() {
  const builder = Builder();
  const page = Page();

  const view = MainPageView({
    builderView: builder.getBuilderView(),
    pageView: page.getPageView(),
  });

  const model = MainPageModel({
    builderModel: builder.getBuilderModel(),
  });

  return Object.freeze({
    ...view,
    ...model,
    getMainPageView() {
      return MainPageView;
    },
    getMainPageModel() {
      return model;
    },
  });
}
