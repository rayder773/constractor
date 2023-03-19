export function TabsView() {
  return Object.freeze({
    createTabsElement() {
      const container = document.createElement("div");
      container.id = "tabs";

      const listElement = document.createElement("ul");
      listElement.id = "tabs-list";
      container.append(listElement);

      const addButtonElement = document.createElement("button");
      addButtonElement.textContent = "+";
      addButtonElement.id = "add-tab-button";
      container.append(addButtonElement);

      return container;
    },
  });
}
