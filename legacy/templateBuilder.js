const elementProps = {
  children(data) {
    if (!Array.isArray(data)) return;

    data.forEach((child) => {
      this.append(child);
    });
  },
  href(data) {
    this.href = data;
  },
  text(data) {
    this.textContent = data;
  },
  name(data) {
    this.setAttribute("data-name", data);
  },
};

function createElement(tag = "div", props = "") {
  const element = document.createElement(tag);

  for (let key in props) {
    if (!props[key] || !elementProps[key]) continue;

    elementProps[key].call(element, props[key]);
  }

  return element;
}

function div(props) {
  return createElement("div", props);
}

function a(props) {
  return createElement("a", props);
}

export { div, a };
