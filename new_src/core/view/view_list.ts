import { View } from "./index.js";

export class ViewList extends View {
  items: Array<HTMLElement>;

  constructor() {
    super();
    this.items = [];
  }

  html(): HTMLElement {
    return document.createElement("ul");
  }

  create() {
    this.rootElement = this.html();
  }

  createListItem(data: any) {
    return document.createElement("li");
  }

  append(data: any) {
    const itemElement = this.createListItem(data);

    this.items.push(itemElement);

    this.rootElement.append(itemElement);
  }
}
