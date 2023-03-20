import { Model } from "../common/model.js";

const EVENT = {
  NEW: "NEW",
};

export function TabsModel() {
  let tabs = [];

  const model = Model();

  const module = Object.freeze({
    ...model,
    addTab() {
      const newTab = {
        id: tabs.length,
        name: "Tab " + tabs.length,
      };

      tabs.push(newTab);

      model.notify(EVENT.NEW, newTab);
    },
    onNewTab(callback) {
      model.addListener(EVENT.NEW, callback);
    },
  });

  return module;
}
