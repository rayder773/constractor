import { Tabs } from "../tabs/index.js";
import { BuilderView } from "./view.js";

export function Builder() {
  const tabs = Tabs();

  const view = BuilderView({ tabsView: tabs.getTabsView() });

  view.addListener("RENDER", () => {
    console.log("render builder");
  });

  return Object.freeze({
    ...view,
    getBuilderView() {
      return view;
    },
  });
}
