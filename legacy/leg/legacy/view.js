class View {
  constructor(template, styles) {
    this.nameToElement = {};
    this.template = template;
    this.nameToStyle = styles;
    this.setNames();
    this.setStyles();
  }

  $(name) {
    return this.nameToElement[name];
  }

  setNames() {
    const namedElements = this.template.querySelectorAll("[data-name]");

    if (this.template.dataset.name) {
      this.nameToElement[this.template.dataset.name] = this.template;
    }

    Array.from(namedElements).forEach((el) => {
      this.nameToElement[el.dataset.name] = el;
    });

    return this;
  }

  setStyles() {
    if (!this.nameToStyle) return;

    for (let elementName in this.nameToStyle) {
      const styles = this.nameToStyle[elementName];

      for (let styleName in styles) {
        this.nameToElement[elementName].style[styleName] = styles[styleName];
      }
    }

    return this;
  }

  appendTo(parent) {
    if (typeof parent === "string") {
      parent = document.querySelector(parent);
    }

    if (!parent) {
      return console.warn("no element found");
    }

    parent.append(this.template);

    return this;
  }

  append(names) {
    for (let key in names) {
      const element = this.nameToElement[key];

      if (!element) {
        console.warn("no element in template");
        continue;
      }

      let newChild = names[key];

      if (newChild instanceof HTMLElement) {
        newChild = new View(newChild);
      }

      element.append(newChild.template);
    }

    return this;
  }
}

export { View };
