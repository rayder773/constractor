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

  onEvent(eventType: string, e: Event, index?: any) {
    this.emit(eventType, e, index);
  }

  handleEvent(
    element: HTMLElement,
    eventName: string,
    eventType: string
  ): void {
    element.addEventListener(eventName, (e) => {
      let target = e.target as HTMLElement;

      while (target.classList.contains("item") === false) {
        target = target.parentElement as HTMLElement;
      }

      const foundIndex = this.items.findIndex((el) => el === target);

      this.onEvent(eventType, e, foundIndex);
    });
  }
}
