import { div, a } from "../templateBuilder.js";

const loginPage = div({
  text: "looogin page",
  children: [a({ href: "#/", text: "home page" })],
});

export { loginPage };
