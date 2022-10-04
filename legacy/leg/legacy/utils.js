export function HTMLtoObject(html) {
  if (!html) return;

  const obj = {};

  if (typeof html === "string") {
    const div = document.createElement("div");
    div.innerHTML = html;

    if (!div?.children?.length) return;

    html = div.children[0];
  }

  if (!(html instanceof HTMLElement)) return;

  obj[html.tagName.toLowerCase()] = {
    element: html,
  };

  Object.keys(html.attributes).forEach((index) => {
    const { name = "", value = "" } = html.attributes[index];

    Object.assign(obj[html.tagName.toLowerCase()], {
      [name]: value,
    });
  });

  if (html.children.length) {
    obj.ch = [];

    Array.from(html.children).forEach((c) => {
      const json = HTMLtoObject(c);
      obj.ch.push(json);
    });
  }

  return obj;
}
