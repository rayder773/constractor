import { View } from "./index.js";

export class ViewList extends View {
  items: Array<HTMLElement>;

  constructor() {
    super();
    this.items = [];
  }

  html(): {} {
    return document.createElement("ul");
  }

  create() {
    this.rootElement = this.createFromSchema(this.html()).rootElement;
  }

  createListItem(data: any) {
    return this.createFromSchema({
      tag: "li",
    });
  }

  append(data: any) {
    const itemElement = this.createListItem(data).rootElement;

    this.items.push(itemElement);

    this.rootElement.append(itemElement);
  }
}
