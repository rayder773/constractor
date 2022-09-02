import { div, a } from "../templateBuilder.js";

const homePage = div({
  text: "home page",
  children: [
    a({ href: "#/login", text: "login page" }),
    a({ href: "#/logout", text: "logout" }),
  ],
});

export { homePage };
