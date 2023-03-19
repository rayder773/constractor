import { PageView } from "./view.js";

export function Page() {
  const view = PageView();

  view.addListener("RENDER", () => {
    console.log("render page");
  });

  return Object.freeze({
    ...view,
    getPageView() {
      return view;
    },
  });
}
