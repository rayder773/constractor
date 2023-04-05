import { Child } from "../Child.js";

export class Model extends Child {
  data: { [key: string]: any };

  constructor() {
    super();

    this.data = {};
  }
}
