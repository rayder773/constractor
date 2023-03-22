import { View } from "../common/view.js";

const EVENT = {
  NEW_PAGE_ITEM: "NEW_PAGE_ITEM",
};

export function PagesView({ gridView } = {}) {
  const view = View();

  view.addChild(gridView);

  view.addListener(EVENT.NEW_PAGE_ITEM, (data) => {
    gridView.renderRootGridElement({
      ...data,
      parentElementId: `page-${data.id}`,
    });
  });

  const module = Object.freeze({
    ...view,
    createPagesListElement() {
      const container = document.createElement("div");
      container.id = "pages";

      return container;
    },
    renderPagesItemElement(data) {
      const element = this.createPagesItemElement(data);

      document.getElementById("pages").append(element);

      this.notify(EVENT.NEW_PAGE_ITEM, data);
    },
    createPagesItemElement(params) {
      const { id } = params;

      if (typeof id === "undefined") {
        throw new Error("Missing id");
      }

      const container = document.createElement("div");
      container.id = `page-${id}`;
      container.classList.add("page");

      return container;
    },
    onActivePageElementClick(callback) {
      document.getElementById("pages").addEventListener("click", callback);
    },
  });

  return module;
}
