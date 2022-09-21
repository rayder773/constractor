import { Module } from "./module.js";

export function testModule() {
  const module = new Module({ name: "test" });

  if (module.getParent()) {
    return console.error("shoiiiiit");
  }

  try {
    module.setParent();
  } catch (err) {
    return console.error("shoiiiiit");
  }

  const childModule = new Module({ name: "child" });

  module.setParent(childModule);

  if (!module.getParent()) {
    return console.error("shoiiiiit");
  }
}
