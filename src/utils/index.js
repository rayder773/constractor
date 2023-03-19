export function createElementFromString(str) {
  const div = document.createElement("div");

  div.innerHTML = str;

  return div.children.length === 1 ? div.children[0] : div;
}
